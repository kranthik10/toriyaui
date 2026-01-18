import * as React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';
import { Check, ChevronDown } from 'lucide-react-native';
import { cn } from '../ui/utils';

const SelectContext = React.createContext<{
    open: boolean;
    setOpen: (open: boolean) => void;
    value?: string;
    onValueChange?: (value: string) => void;
} | null>(null);

const Select = ({
    value,
    onValueChange,
    children,
}: {
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <SelectContext.Provider value={{ open, setOpen, value, onValueChange }}>
            {children}
        </SelectContext.Provider>
    );
};

const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof TouchableOpacity>,
    React.ComponentPropsWithoutRef<typeof TouchableOpacity>
>(({ className, children, ...props }, ref) => {
    const { setOpen } = React.useContext(SelectContext)!;

    return (
        <TouchableOpacity
            ref={ref}
            onPress={() => setOpen(true)}
            className={cn(
                "flex-row items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown size={16} className="opacity-50" color="currentColor" />
        </TouchableOpacity>
    );
});
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef<
    React.ElementRef<typeof Text>,
    React.ComponentPropsWithoutRef<typeof Text> & { placeholder?: string }
>(({ className, placeholder, ...props }, ref) => {
    const { value } = React.useContext(SelectContext)!;

    return (
        <Text
            ref={ref}
            className={cn("text-sm text-foreground", !value && "text-muted-foreground", className)}
            {...props}
        >
            {value || placeholder}
        </Text>
    );
});
SelectValue.displayName = "SelectValue";

const SelectContent = ({
    className,
    children,
    position = "popper",
}: {
    className?: string;
    children: React.ReactNode;
    position?: "popper" | "item-aligned";
}) => {
    const { open, setOpen } = React.useContext(SelectContext)!;

    return (
        <Modal
            transparent
            visible={open}
            animationType="fade"
            onRequestClose={() => setOpen(false)}
        >
            <View className="flex-1 justify-center items-center bg-black/50 p-4">
                <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
                <View
                    className={cn(
                        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md w-full max-w-xs scale-100 opacity-100",
                        className
                    )}
                >
                    <View className="p-1">{children}</View>
                </View>
            </View>
        </Modal>
    );
};

const SelectItem = React.forwardRef<
    React.ElementRef<typeof TouchableOpacity>,
    React.ComponentPropsWithoutRef<typeof TouchableOpacity> & { value: string }
>(({ className, children, value, ...props }, ref) => {
    const { value: selectedValue, onValueChange, setOpen } = React.useContext(SelectContext)!;
    const isSelected = selectedValue === value;

    return (
        <TouchableOpacity
            ref={ref}
            className={cn(
                "relative flex w-full cursor-default select-none flex-row items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                isSelected && "bg-accent",
                className
            )}
            onPress={() => {
                onValueChange?.(value);
                setOpen(false);
            }}
            {...props}
        >
            <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {isSelected && <Check size={14} strokeWidth={3} className="text-foreground" />}
            </View>
            <Text className="text-sm font-medium text-foreground">{children}</Text>
        </TouchableOpacity>
    );
});
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
