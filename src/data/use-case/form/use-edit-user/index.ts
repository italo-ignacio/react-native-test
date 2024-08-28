import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import { editUserSchema } from 'validation/schema';
import { logout } from 'store/persist/slice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { EditUserRequest } from 'validation/schema';
import type { SubmitHandler } from 'react-hook-form';
import type { formReturn } from 'domain/protocol';

export const useEditUser = (): formReturn<EditUserRequest> => {
  const formData = useForm<EditUserRequest>({
    resolver: yupResolver(editUserSchema)
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<EditUserRequest> = async (data) => {
    try {
      const name = data.fullName.split(' ');

      const firstName = name[0];
      const lastName = name.slice(1).join(' ') ?? '';

      await api.put({
        body: { ...data, firstName, lastName },
        route: apiPaths.user
      });

      dispatch(logout());
      callToast.success('Atualizado com sucesso');
    } catch (err) {
      resolverError(err);
    }
  };

  return { ...formData, onSubmit };
};
