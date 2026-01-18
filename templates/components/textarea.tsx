import * as React from 'react';
import { TextInput } from 'react-native';
import { cn } from '../ui/utils';

const Textarea = React.forwardRef<
    React.ElementRef<typeof TextInput>,
    React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, ...props }, ref) => {
    return (
        <TextInput
            ref={ref}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className={cn(
                "web:flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            placeholderTextColor={props.placeholderTextColor ?? "#a1a1aa"}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
