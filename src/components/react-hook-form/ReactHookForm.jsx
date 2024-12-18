import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const yupSchema = yup.object({
  field1: yup.string().required('Required'),
  field2: yup
    .mixed()
    .nullable()
    .when(['field1'], {
      is: ([field1]) => !!field1,
      then: () =>
        yup.object({
          gender: yup.string().required('Required'),
          age: yup
            .string()
            .required('Required')
            .test('min age', 'Age must be at least 18', (age) => age >= 18),
        }),
    }),
});

export default function ReactHookForm() {
  const form = useForm({
    resolver: yupResolver(yupSchema),
  });

  console.log('error: ', form.formState.errors);

  const onSubmit = (data) => {
    console.log('submit: ', data);
  };

  const onInvalid = (error) => {
    console.log('error onInvalid: ', error);
  };

  return (
    <Box>
      <Text>React Hook Form</Text>
      <form form={form} onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
        <VStack>
          <VStack>
            <Input placeholder="Name" {...form.register('field1')} />
            {form?.formState?.errors?.field1?.message && (
              <Text margin={0} fontSize={'10px'} color={'red'}>
                {form?.formState?.errors?.field1?.message}
              </Text>
            )}
          </VStack>
          <VStack>
            <Input placeholder="Gender" {...form.register('field2.gender')} />
            <Text margin={0} fontSize={'10px'} color={'red'}>
              {form?.formState?.errors?.field2?.gender?.message}
            </Text>
          </VStack>
          <VStack>
            <Input
              placeholder="Age"
              type="number"
              {...form.register('field2.age')}
            />
            <Text margin={0} fontSize={'10px'} color={'red'}>
              {form?.formState?.errors?.field2?.age?.message}
            </Text>
          </VStack>

          <Button type="submit">Submit</Button>
        </VStack>
      </form>
    </Box>
  );
}
