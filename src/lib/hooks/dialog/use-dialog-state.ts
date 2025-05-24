import { useCallback, useMemo, useState } from 'react';

export type UseDialogStateReturn<T = boolean> = {
	state: T | null;
	onOpenChange: (open: boolean) => void;
	isOpen: boolean;
} & (T extends boolean
	? {
			onOpen: () => void;
		}
	: {
			onOpen: (state?: T) => void;
		});

export function useDialogState<T = boolean>(): UseDialogStateReturn<T> {
	const [state, setState] = useState<T | null>(null);

	const onOpen = useCallback((stateValue: T) => {
		setState(typeof stateValue === 'undefined' ? (true as T) : stateValue);
	}, []);

	const onOpenChange = useCallback((open: boolean) => {
		if (!open) {
			setState(null);
		}
	}, []);

	return useMemo(
		() => ({
			state,
			onOpen,
			onOpenChange,
			isOpen: state !== null
		}),
		[state, onOpenChange, onOpen]
	) as unknown as UseDialogStateReturn<T>;
}
