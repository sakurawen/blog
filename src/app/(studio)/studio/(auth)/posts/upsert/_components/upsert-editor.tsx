'use client';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Editor } from '~/components/features/editor';
import { Button } from '~/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '~/components/ui/field';
import { InputGroup, InputGroupInput, InputGroupTextarea } from '~/components/ui/input-group';
import { Spinner } from '~/components/ui/spinner';
import { useEditor } from '~/hooks/use-editor';

const postFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  slug: z.string().min(1, 'Slug is required'),
});

export function UpsertEditor(_: { id?: string }) {
  const editor = useEditor();
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      slug: '',
    },
    validators: {
      onSubmit: postFormSchema,
    },
    async onSubmit({ value }) {
      console.log(value, editor.getHTML());
    },
  });
  return (
    <div className='flex flex-col md:flex-row h-[calc(100vh-82px)] overflow-hidden'>
      <div className='editor-form w-full md:w-xs overflow-y-auto md:order-2 border-b md:border-b-0 md:border-l border-(--tt-toolbar-border-color)'>
        <div className='md:sticky md:top-0 p-2 bg-[--tt-background-color]'>
          <form onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          >
            <FieldSet>
              <FieldGroup>
                <form.Field name='title'>
                  {(field) => {
                    const inValid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={inValid}>
                        <FieldLabel>Title</FieldLabel>
                        <InputGroup>
                          <InputGroupInput placeholder='请输入标题' value={field.state.value} onChange={e => field.handleChange(e.target.value)} />
                        </InputGroup>
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name='slug'>
                  {(field) => {
                    const isValid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isValid}>
                        <FieldLabel>
                          Slug
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupInput placeholder='请输入slug' value={field.state.value} onChange={e => field.handleChange(e.target.value)} />
                        </InputGroup>
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name='description'>
                  {(field) => {
                    const isValid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isValid}>
                        <FieldLabel>Description</FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea placeholder='请输入placeholder' value={field.state.value} onChange={e => field.handleChange(e.target.value)} />
                        </InputGroup>
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Subscribe>
                  {(form) => {
                    return (
                      <Button type='submit' disabled={form.isSubmitting}>
                        {form.isSubmitting && <Spinner />}
                        Submit
                      </Button>
                    );
                  }}
                </form.Subscribe>
              </FieldGroup>
            </FieldSet>
          </form>
        </div>
      </div>
      <div className='flex-1 overflow-y-auto md:order-1'>
        <Editor editor={editor} />
      </div>
    </div>
  );
}
