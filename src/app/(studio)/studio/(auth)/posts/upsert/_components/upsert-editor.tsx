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
    <div>
      <div className='px-1 pt-1 pb-2 border-b border-(--tt-toolbar-border-color)'>
        <form>
          <FieldSet>
            <FieldGroup className='grid grid-cols-1 md:grid-cols-2'>
              <form.Field name='title'>
                {(field) => {
                  const isValid = field.state.meta.isValid;
                  return (
                    <Field data-invalid={isValid}>
                      <FieldLabel>Title</FieldLabel>
                      <InputGroup>
                        <InputGroupInput value={field.state.value} onChange={e => field.handleChange(e.target.value)} />
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
                        <InputGroupInput />
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
                        <InputGroupTextarea />
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
      <Editor />
    </div>
  );
}
