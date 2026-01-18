import * as React from 'react';
import { View } from 'react-native';
import SliderPrimitive from '@react-native-community/slider';
import { cn } from '../ui/utils';

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive>
>(({ className, ...props }, ref) => (
    <SliderPrimitive
        ref={ref}
        style={{ width: '100%', height: 40 }}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        {...props}
    />
));
Slider.displayName = "Slider";

export { Slider };
