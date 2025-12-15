'use client';
import { useForm } from '@tanstack/react-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { parseResponse } from 'hono/client';
import { isNil } from 'lodash-es';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useEffectEvent, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'sonner';
import { BannerUpload } from '~/components/features/banner-upload';
import { Editor } from '~/components/features/editor';
import { Button } from '~/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '~/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '~/components/ui/input-group';
import { Spinner } from '~/components/ui/spinner';
import { useEditor } from '~/hooks/use-editor';
import { hono } from '~/lib/hono';

interface PostFormData {
  title?: string
  description?: string
  slug?: string
  banner?: string
  summary?: string
  htmlContent?: string
  jsonContent?: any
}

export function UpsertEditor(props: { id?: string }) {
  const { id } = props;
  const editor = useEditor();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      banner: post?.data?.banner ?? 'https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      summary: post?.data?.summary ?? '',
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

  async function handleCreate(submitData: PostFormData) {
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

  async function handleUpdate(submitData: PostFormData) {
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

  // 自动保存函数
  const autoSave = useCallback(async () => {
    if (!id)
      return; // 只有更新时才自动保存，新建时不自动保存

    const formValues = form.state.values;
    const htmlContent = editor.getHTML();
    const jsonContent = editor.getJSON();

    try {
      setIsSaving(true);
      await parseResponse(hono.api.posts.$put({
        json: {
          ...formValues,
          htmlContent,
          jsonContent,
          id,
        },
      }));
      queryClient.invalidateQueries({ queryKey: ['post-detail', id] });
    }
    catch (err) {
      console.error('自动保存失败:', err);
      toast.error('自动保存失败');
    }
    finally {
      setIsSaving(false);
    }
  }, [id, editor, form.state.values, queryClient]);

  // 防抖的自动保存触发
  const triggerAutoSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      autoSave();
    }, 2000);
  }, [autoSave]);

  // Ctrl+S 快捷键保存
  useHotkeys('mod+s', (e) => {
    e.preventDefault();
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    autoSave();
  }, {
    enableOnFormTags: true,
    enableOnContentEditable: true,
    preventDefault: true,
  });

  // 监听编辑器内容变化
  useEffect(() => {
    if (!editor || !id)
      return;

    const handleUpdate = () => {
      triggerAutoSave();
    };

    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [editor, id, triggerAutoSave]);

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
                          onChange={(value) => {
                            field.handleChange(value);
                            triggerAutoSave();
                          }}
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
                          <InputGroupInput
                            placeholder='请输入标题'
                            value={field.state.value}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                              triggerAutoSave();
                            }}
                          />
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
                          <InputGroupInput
                            placeholder='请输入slug'
                            value={field.state.value}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                              triggerAutoSave();
                            }}
                          />
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
                          <InputGroupTextarea
                            placeholder='请输入Description'
                            value={field.state.value}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                              triggerAutoSave();
                            }}
                          />
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
                          <InputGroupTextarea
                            placeholder='请输入Summary'
                            value={field.state.value}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                              triggerAutoSave();
                            }}
                          />
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
              </FieldGroup>
            </FieldSet>
          </form>
        </div>
      </div>
      <div className='flex-1 overflow-y-auto md:order-1 relative'>
        {isSaving && (
          <div className='absolute top-16 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm text-sm text-muted-foreground'>
            <Spinner className='size-3' />
            <span>Saving...</span>
          </div>
        )}
        <Editor editor={editor} />
      </div>
    </div>
  );
}
