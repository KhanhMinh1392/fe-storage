'use client';
import Icon, { GoogleIcon } from '@/components/icon';
import { setCookie } from 'cookies-next';
import { postSignIn } from '@/services/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type SignUpSchemaType = z.infer<typeof SignInSchema>;

export default function SignIn() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const isWindow = typeof window !== 'undefined';

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRememberMe, setIsRememberMe] = useState<boolean>(
    isWindow ? localStorage.getItem('remember') === 'true' : false,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: isWindow ? localStorage.getItem('username') || '' : '',
      password: isWindow ? localStorage.getItem('password') || '' : '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postSignIn,
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
    localStorage.setItem('username', isRememberMe ? data.email : '');
    localStorage.setItem('password', isRememberMe ? data.password : '');
    localStorage.setItem('remember', String(isRememberMe));

    mutate(data, {
      onSuccess: (data) => {
        reset();
        onClose();
        setCookie('accessToken', data.accessToken);
        router.push('/home');
        router.refresh();
        toast.success('Sign in successfully');
      },
      onError: () => {
        toast.error('Sign in failure');
      },
    });
  };

  const handleOpenChange = () => {
    onOpenChange();
    setIsVisible(false);
    reset();
  };

  return (
    <>
      <Button variant="bordered" onPress={onOpen}>
        Sign In
      </Button>
      <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-2xl">Sign in</ModalHeader>
              <ModalBody className="gap-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    isRequired
                    size="md"
                    variant="bordered"
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    className="h-20"
                    {...register('email')}
                  />
                  <Input
                    isRequired
                    label="Password"
                    variant="bordered"
                    placeholder="Enter your password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        <Icon
                          name={isVisible ? 'eye' : 'eye-off'}
                          className="pointer-events-none text-2xl text-default-400"
                        />
                      </button>
                    }
                    type={isVisible ? 'text' : 'password'}
                    className="h-20"
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    {...register('password')}
                  />
                  <div className="mb-4 flex items-center justify-between">
                    <Checkbox size="md" isSelected={isRememberMe} onClick={() => setIsRememberMe(!isRememberMe)}>
                      <span className="text-sm text-gray-500">Remember me</span>
                    </Checkbox>
                    <Link href="#" className="text-sm text-blue-500">
                      Forgot password?
                    </Link>
                  </div>
                  <Button color="primary" type="submit" size="lg" className="w-full" isDisabled={isPending}>
                    Sign in
                  </Button>
                </form>
              </ModalBody>
              <div className="inline-flex w-full items-center justify-center pt-2">
                <hr className="my-4 h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
                <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-600 dark:bg-gray-900 dark:text-white">
                  or
                </span>
              </div>
              <ModalFooter>
                <Button size="lg" variant="bordered" className="w-full" onPress={onClose}>
                  <GoogleIcon />
                  Sign in with Google
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
