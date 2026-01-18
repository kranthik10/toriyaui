import * as React from 'react';
import { View, Text, ViewProps, TextProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';
import { AlertTriangle, Info } from 'lucide-react-native';

const alertVariants = cva(
    "relative w-full rounded-lg border p-4 flex-row items-start gap-4",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                    "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const Alert = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof alertVariants> & {
        icon?: React.ReactNode;
    }
>(({ className, variant, icon, children, ...props }, ref) => {
    return (
        <View
            ref={ref}
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        >
            {icon && <View className="mt-1 ios:mt-0.5">{icon}</View>}
            <View className="flex-1 space-y-1">
                {children}
            </View>
        </View>
    );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
    React.ElementRef<typeof Text>,
    React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
    <Text
        ref={ref}
        className={cn("text-base font-semibold leading-none tracking-tight text-foreground", className)}
        {...props}
    />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
    React.ElementRef<typeof Text>,
    React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
    <Text
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
