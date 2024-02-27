"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"




import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { aspectRatioOptions, defaultValues, transformationTypes } from '@/constants'
import { CustomField } from './CustomField'
import { AspectRatioKey } from '@/lib/utils'

export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
})


const TranformationForm = ({ action, data = null, userId, creditBalance, type, config = null }: TransformationFormProps) => {

    const transformationType = transformationTypes[type];

    const [image, setImage] = useState(data);
    const [newTransformation, setNewTrasnformation] = useState<Transformations | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [istransforming, setIsTransforming] = useState(false);
    const [transformationCongif, setTransformationConfig] = useState(config)

    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,


    } : defaultValues
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {


    }

    const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {

    }

    const onTransformHandler = ()=>{}

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomField
                    control={form.control}
                    name="title"
                    formLabel='Image title'
                    className='w-full'
                    render={({ field }) => <Input {...field} className='input-field' />}
                />
                {type === 'fill' && (
                    <CustomField
                        control={form.control}
                        name="aspectRatio"
                        formLabel='Aspect Ratio'
                        className='w-full'

                        render={({ field }) => (
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(aspectRatioOptions).map
                                        ((key) => (
                                            <SelectItem key={key} value={key}
                                                className='select-item'>
                                                {aspectRatioOptions[key as AspectRatioKey]?.label}
                                            </SelectItem>


                                        ))}
                                </SelectContent>
                            </Select>

                        )}
                    />
                )}
                {(type === 'remove' || type === 'recolor') && (
                    <div className='prompt-field'>
                        <CustomField
                            control={form.control}
                            name="prompt"
                            formLabel={
                                type === 'remove' ? 'Object to remove' : 'Object to recolor'
                            }
                            className='w-full'
                            render={(({ field }) => (
                                <Input
                                    value={field.value}
                                    className='input-field'
                                    onChange={(e) => onInputChangeHandler(
                                        'prompt',
                                        e.target.value,
                                        type,
                                        field.onChange
                                    )}
                                />
                            ))}
                        />
                        {type === 'recolor' && (
                            <CustomField
                                control={form.control}
                                name="color"
                                formLabel='Replacement Color'
                                render={({ field }) => (
                                    <Input value={field.value}
                                        className='input-field'
                                        onChange={(e) => onInputChangeHandler(
                                            'color',
                                            e.target.value,
                                            'recolor',
                                            field.onChange

                                        )} />
                                )}
                            />
                        )}
                    </div>
                )}
                <div className='flex flex-col gap-4'>
                    <Button type='button' className='submit-button capitalize'
                        disabled={istransforming || newTransformation === null}
                        onClick={onTransformHandler}>{istransforming?'Transforming...':'Apply transformation'}</Button>
                    <Button type='submit' className='submit-button capitalize'
                        disabled={isSubmitting}>{isSubmitting?'Submitting':'Save'}</Button>

                </div>



            </form>
        </Form>
    )
}

export default TranformationForm