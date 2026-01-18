import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../ui/utils';

const Separator = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View> & {
        orientation?: "horizontal" | "vertical";
        decorative?: boolean;
    }
>(
    (
        { className, orientation = "horizontal", decorative = true, ...props },
        ref
    ) => (
        <View
            ref={ref}
            className={cn(
                "bg-border shrink-0",
                orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                className
            )}
            {...props}
        />
    )
);
Separator.displayName = "Separator";

export { Separator };
