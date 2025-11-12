'use client';
import { Icon } from '@iconify/react';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { authClient } from '~/lib/auth-client';
import { cn } from '~/lib/utils';

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  function githubSignIn() {
    authClient.signIn.social({
      provider: 'github',
      callbackURL: location.href,
    });
  }
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    async onSubmit({ value }) {
      const res = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });
      if (res.data?.user) {
        router.push('/studio');
      }
      else {
        toast('login failed');
      }
    },
  });

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Login to your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your email below to login to your account
          </p>
        </div>
        <form.Field
          name='email'
          children={(field) => {
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  type='email'
                  placeholder='m@example.com'
                  required
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
              </Field>
            );
          }}
        />
        <form.Field
          name='password'
          children={(field) => {
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  id={field.name}
                  type='password'
                  required
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
              </Field>
            );
          }}
        />
        <Field>
          <Button disabled={form.state.isSubmitting} type='submit'>
            {
              form.state.isSubmitting ? 'Loading...' : 'Login'
            }
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant='outline' type='button' onClick={githubSignIn}>
            <Icon className='mr-1 size-4.5' icon='ri:github-fill' />
            Login with GitHub
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
