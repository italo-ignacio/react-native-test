import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

export type formReturn<T extends FieldValues> = UseFormReturn<T> & { onSubmit: SubmitHandler<T> };
