import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type framework = {
  value: string;
  label: string;
};

type ComboboxProps = {
  frameworks: framework[];
  addToData?: React.Dispatch<React.SetStateAction<string[]>>;
  selectedList?: string[];
};

const Combobox = ({ frameworks, addToData, selectedList }: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
            : "Select framework..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandEmpty>No framework found.</CommandEmpty>
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
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      frameworks.filter((item) => item.value !== currentValue);

                      if (addToData) {
                        //select
                        if (currentValue !== value) {
                          addToData((data) => [...data, currentValue]);
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
