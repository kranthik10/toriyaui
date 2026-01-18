import * as React from 'react';
import { Switch as RNSwitch, Platform } from 'react-native';
import { cn } from '../ui/utils';

const Switch = React.forwardRef<
    React.ElementRef<typeof RNSwitch>,
    React.ComponentPropsWithoutRef<typeof RNSwitch>
>(({ className, ...props }, ref) => {
    return (
        <RNSwitch
            ref={ref}
            className={cn(
                "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
});
Switch.displayName = "Switch";

export { Switch };
