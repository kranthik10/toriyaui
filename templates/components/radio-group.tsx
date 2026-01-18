import * as React from 'react';
import { View, Pressable } from 'react-native';
import { Circle } from 'lucide-react-native';
import { cn } from '../ui/utils';

const RadioGroupContext = React.createContext<{
    value?: string;
    onValueChange?: (value: string) => void;
} | null>(null);

const RadioGroup = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View> & {
        value?: string;
        onValueChange?: (value: string) => void;
    }
>(({ className, value, onValueChange, ...props }, ref) => {
    return (
        <RadioGroupContext.Provider value={{ value, onValueChange }}>
            <View className={cn("gap-2", className)} ref={ref} {...props} />
        </RadioGroupContext.Provider>
    );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<
    React.ElementRef<typeof Pressable>,
    React.ComponentPropsWithoutRef<typeof Pressable> & {
        value: string;
    }
>(({ className, value, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);
    const checked = context?.value === value;

    return (
        <Pressable
            ref={ref}
            className={cn(
                "aspect-square h-5 w-5 rounded-full border border-primary bg-background items-center justify-center",
                checked && "text-primary",
                className
            )}
            onPress={() => context?.onValueChange?.(value)}
            {...props}
        >
            {checked && <Circle size={10} fill="currentColor" className="text-primary" />}
        </Pressable>
    );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
