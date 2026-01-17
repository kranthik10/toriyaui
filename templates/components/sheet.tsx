import * as React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';
import { cn } from '../ui/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SheetContext = React.createContext<{
    open: boolean;
    setOpen: (open: boolean) => void;
} | null>(null);

function useSheet() {
    const context = React.useContext(SheetContext);
    if (!context) {
        throw new Error('useSheet must be used within a Sheet');
    }
    return context;
}

const Sheet = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <SheetContext.Provider value={{ open, setOpen }}>
            {children}
        </SheetContext.Provider>
    );
};

const SheetTrigger = ({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) => {
    const { setOpen } = useSheet();

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onPress: () => setOpen(true),
        } as any);
    }

    return (
        <TouchableOpacity onPress={() => setOpen(true)}>
            {children}
        </TouchableOpacity>
    );
};

const SheetContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const { open, setOpen } = useSheet();
    const insets = useSafeAreaInsets();

    return (
        <Modal
            transparent
            visible={open}
            animationType="slide"
            onRequestClose={() => setOpen(false)}
        >
            <View style={styles.overlay} className="flex-1 bg-black/50 justify-end">
                <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
                <View
                    style={{ paddingBottom: insets.bottom }}
                    className={cn(
                        "bg-background w-full rounded-t-3xl border-t border-border p-6 shadow-lg",
                        className
                    )}
                >
                    <View className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const SheetHeader = ({ className, ...props }: { className?: string; children: React.ReactNode }) => (
    <View className={cn("mb-4 space-y-2", className)} {...props} />
);

const SheetTitle = ({ className, ...props }: { className?: string; children: React.ReactNode }) => (
    <Text
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
    />
);

const SheetDescription = ({ className, ...props }: { className?: string; children: React.ReactNode }) => (
    <Text
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
);

const SheetFooter = ({ className, ...props }: { className?: string; children: React.ReactNode }) => (
    <View
        className={cn("mt-4 flex-row justify-end space-x-2", className)}
        {...props}
    />
);

const SheetClose = ({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) => {
    const { setOpen } = useSheet();

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onPress: () => setOpen(false),
        } as any);
    }

    return (
        <TouchableOpacity onPress={() => setOpen(false)}>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose };
