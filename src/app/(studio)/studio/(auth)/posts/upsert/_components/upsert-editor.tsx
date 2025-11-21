'use client';
import { useForm } from '@tanstack/react-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { parseResponse } from 'hono/client';
import { isNil } from 'lodash-es';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useEffectEvent } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { BannerUpload } from '~/components/features/banner-upload';
import { Editor } from '~/components/features/editor';
import { Button } from '~/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '~/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '~/components/ui/input-group';
import { Spinner } from '~/components/ui/spinner';
import { useEditor } from '~/hooks/use-editor';
import { hono } from '~/lib/hono';

const postFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  slug: z.string().min(1, 'Slug is required'),
  banner: z.url(),
  summary: z.string(),
});

export function UpsertEditor(props: { id?: string }) {
  const { id } = props;
  const editor = useEditor();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: post } = useQuery({
    enabled: !isNil(id),
    queryKey: ['post-detail', id],
    queryFn() {
      return parseResponse(hono.api.posts[':id'].$get({
        param: { id: id as string },
      }));
    },
  });

  const form = useForm({
    defaultValues: {
      title: post?.data?.title ?? '',
      description: post?.data?.description ?? '',
      slug: post?.data?.slug ?? '',
      banner: post?.data?.banner ?? '',
      summary: post?.data?.summary ?? '',
    },
    validators: {
      onSubmit: postFormSchema,
    },
    async onSubmit({ value }) {
      const htmlContent = editor.getHTML();
      const jsonContent = editor.getJSON();
      const submitData = {
        ...value,
        htmlContent,
        jsonContent,
      };
      if (id) {
        return handleUpdate(submitData);
      }
      else {
        return handleCreate(submitData);
      }
    },
  });

  async function handleCreate(submitData: z.infer<typeof postFormSchema> & { htmlContent: string, jsonContent: any }) {
    try {
      const resp = await parseResponse(hono.api.posts.$post({
        json: submitData,
      }));
      if (resp.data.id) {
        toast.success('文章创建成功');
        router.push(`/studio/posts/upsert/${resp.data.id}`);
      }
    }
    catch (err) {
      toast.error('文章创建失败');
      throw err;
    }
  }

  async function handleUpdate(submitData: z.infer<typeof postFormSchema> & { htmlContent: string, jsonContent: any }) {
    try {
      const resp = await parseResponse(hono.api.posts.$put({
        json: {
          ...submitData,
          id: id as string,
        },
      }));
      if (resp.data.id) {
        toast.success('文章更新成功');
        queryClient.invalidateQueries({ queryKey: ['post-detail', id] });
      }
    }
    catch (err) {
      toast.error('文章更新失败');
      throw err;
    }
  }

  const setEditorContent = useEffectEvent((htmlContent: string) => {
    editor.commands.setContent(htmlContent);
  });

  useEffect(() => {
    if (post?.data) {
      setEditorContent(post.data.htmlContent as string);
    }
  }, [post]);

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
                <form.Field name='banner'>
                  {(field) => {
                    return (
                      <Field>
                        <FieldLabel>Banner</FieldLabel>
                        <BannerUpload
                          value={field.state.value}
                          onChange={value => field.handleChange(value)}
                          onError={error => console.error('Banner upload error:', error)}
                        />
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    );
                  }}
                </form.Field>
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
                          <InputGroupTextarea placeholder='请输入Description' value={field.state.value} onChange={e => field.handleChange(e.target.value)} />
                        </InputGroup>
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name='summary'>
                  {(field) => {
                    const isValid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isValid}>
                        <FieldLabel>Summary</FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea placeholder='请输入Summary' value={field.state.value} onChange={e => field.handleChange(e.target.value)} />
                          <InputGroupAddon align='block-end'>
                            <div className='flex w-full justify-end'>
                              <Button variant='ghost' size='sm' className='rounded-full'>
                                <Sparkles className='size-4' />
                                {' '}
                                AI Generate
                              </Button>
                            </div>
                          </InputGroupAddon>
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
