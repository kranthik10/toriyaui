import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { cn } from '../ui/utils';

const Checkbox = React.forwardRef<
    React.ElementRef<typeof Pressable>,
    React.ComponentPropsWithoutRef<typeof Pressable> & {
        checked?: boolean;
        onCheckedChange?: (checked: boolean) => void;
    }
>(({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
        <Pressable
            ref={ref}
            role="checkbox"
            aria-checked={checked}
            onPress={() => onCheckedChange?.(!checked)}
            className={cn(
                "peer h-5 w-5 shrink-0 rounded-sm border border-primary bg-background items-center justify-center",
                checked && "bg-primary text-primary-foreground",
                className
            )}
            {...props}
        >
            {checked && <Check size={14} className="text-primary-foreground" />}
        </Pressable>
    );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
