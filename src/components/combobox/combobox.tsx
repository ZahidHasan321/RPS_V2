import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

type framework = {
  value: string;
  label: string;
};

type ComboboxProps = {
  frameworks: framework[];
  addToData?: React.Dispatch<React.SetStateAction<string[]>>;
  setData?: React.Dispatch<React.SetStateAction<string>>;
  selectedList?: string[];
  disabled?: boolean;
  placeholder?: string;
  label?: string;
};

const Combobox = ({
  frameworks,
  addToData,
  setData,
  selectedList,
  placeholder = "Search framework...",
  label = "Select framework",
  disabled = false,
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  if (value != "") console.log("combobox", value);

  useEffect(() => {
    if (disabled === true) {
      if (addToData) addToData((data) => data.filter((item) => item !== value));
      setData && setData("");
      setValue("");
    }
  }, [disabled, value, addToData, setData]);

  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find(
                (framework: framework) => framework.value === value
              )?.label
            : label}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => {
                return (
                  <CommandItem
                    key={framework.value}
                    disabled={
                      selectedList &&
                      selectedList.includes(framework.value) &&
                      framework.value !== value
                    }
                    value={framework.value}
                    keywords={[framework.label]}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      if (setData)
                        setData(currentValue === value ? "" : currentValue);

                      if (addToData) {
                        //select
                        if (currentValue !== value) {
                          addToData((data) => [...data, currentValue]);

                          if (value) {
                            addToData((data) =>
                              data.filter((item) => item !== value)
                            );
                          }
                        } else {
                          //unselect
                          addToData((data) =>
                            data.filter((item) => item !== currentValue)
                          );
                        }
                      }

                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
