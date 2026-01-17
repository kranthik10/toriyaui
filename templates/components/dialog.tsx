import * as React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';
import { cn } from '../ui/utils';

const DialogContext = React.createContext<{
    open: boolean;
    setOpen: (open: boolean) => void;
} | null>(null);

function useDialog() {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a Dialog');
    }
    return context;
}

const Dialog = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    );
};

const DialogTrigger = ({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) => {
    const { setOpen } = useDialog();

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

const DialogContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const { open, setOpen } = useDialog();

    return (
        <Modal
            transparent
            visible={open}
            animationType="fade"
            onRequestClose={() => setOpen(false)}
        >
            <View style={styles.overlay} className="flex-1 bg-black/50 justify-center items-center p-4">
                <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
                <View
                    className={cn(
                        "bg-background w-full max-w-sm rounded-lg border border-border p-6 shadow-lg",
                        className
                    )}
                >
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const DialogHeader = ({ className, ...props }: { className?: string; children: React.ReactNode }) => (
    <View className={cn("mb-4 space-y-2 text-center sm:text-left", className)} {...props} />
);

const DialogTitle = ({ className, ...props }: { className?: string; children: React.ReactNode }) => (
    <Text
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
    />
);

const DialogDescription = ({ className, ...props }: { className?: string; children: React.ReactNode }) => (
    <Text
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
);

const DialogFooter = ({ className, ...props }: { className?: string; children: React.ReactNode }) => (
    <View
        className={cn("mt-4 flex-col-reverse space-y-2 space-y-reverse sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0", className)}
        {...props}
    />
);

const DialogClose = ({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) => {
    const { setOpen } = useDialog();

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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose };
