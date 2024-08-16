import { Text, View } from "@react-pdf/renderer";
import { tw } from "../styles";
import { cn } from "@/lib/utils";

export const Table = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <View style={tw(cn(`flex flex-col border-t`, className))}>{children}</View>
);

export const Cell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <View style={tw(cn(`border-r text-center`, className))}>{children}</View>;

export const Row = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <View style={tw(cn(`flex flex-row border-l border-b`, className))}>
    {children}
  </View>
);

export const VCell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <View style={tw(cn(`border-l border-b text-center w-full`, className))}>
    {children}
  </View>
);
