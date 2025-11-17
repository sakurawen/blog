'use client';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Editor } from '~/components/features/editor';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '~/components/ui/field';
import { InputGroup, InputGroupInput, InputGroupTextarea } from '~/components/ui/input-group';

const postFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
});
export function UpsertEditor(_: { id?: string }) {
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      slug: '',
    },
    validators: {
      onSubmit: postFormSchema,
    },
  });
  return (
    <div className='flex flex-col md:flex-row h-[calc(100vh-82px)] overflow-hidden'>
      <div className='editor-form w-full md:w-xs overflow-y-auto md:order-2 border-b md:border-b-0 md:border-l border-(--tt-toolbar-border-color)'>
        <div className='md:sticky md:top-0 p-2 bg-[--tt-background-color]'>
          <form>
            <FieldSet>
              <FieldGroup>
                <form.Field name='title'>
                  {(field) => {
                    const isValid = field.state.meta.isValid;
                    return (
                      <Field data-invalid={isValid}>
                        <FieldLabel>Title</FieldLabel>
                        <InputGroup>
                          <InputGroupInput placeholder='请输入标题' value={field.state.value} onChange={e => field.handleChange(e.target.value)} />
                        </InputGroup>
                        {
                          isValid && <FieldError errors={field.state.meta.errors} />
                        }
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name='slug'>
                  {(field) => {
                    const isValid = field.state.meta.isValid;
                    return (
                      <Field data-invalid={isValid}>
                        <FieldLabel>Slug</FieldLabel>
                        <InputGroup>
                          <InputGroupInput placeholder='请输入slug' />
                        </InputGroup>
                        {
                          isValid && <FieldError errors={field.state.meta.errors} />
                        }
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name='description'>
                  {(field) => {
                    const isValid = field.state.meta.isValid;
                    return (
                      <Field data-invalid={isValid} className='row-span-2'>
                        <FieldLabel>Description</FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea placeholder='请输入placeholder' />
                        </InputGroup>
                        {
                          isValid && <FieldError errors={field.state.meta.errors} />
                        }
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </div>
      </div>
      <div className='flex-1 overflow-y-auto md:order-1'>
        <Editor />
      </div>
    </div>
  );
}
