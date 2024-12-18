import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function ReactQuery() {
  const queryClient = useQueryClient();

  // Get products:
  const query = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/product');
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
      const data = await res.json();
      return data?.data;
    },
    // placeholderData: (data) => {
    //   console.log('data: ', data);
    //   return [{ id: 0, name: 'Placeholder data' }];
    // },
    staleTime: 10000,
  });

  // Mutate products:
  const mutation = useMutation({
    mutationFn: async (data) => {
      await fetch('http://localhost:4000/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      console.log('Success: ', data);
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (error) => console.log('Error: ', error),
  });

  const handleChangeName = (item) => {
    mutation.mutate({
      name: `${item.name} new`,
      price: 222,
      description: 'This is new description',
    });
  };

  if (query.isLoading)
    return (
      <VStack gap={'5px'} w={'100vw'}>
        <Text>Loading ....</Text>
      </VStack>
    );

  return (
    <VStack gap={'5px'} w={'100vw'}>
      {!!query.data?.length &&
        query.data.map((item) => (
          <HStack key={item.id}>
            <Text w={'200px'}>{item.name}</Text>
            <Button
              h={'30px'}
              variant={'unstyled'}
              sx={{ _focus: { outline: 'unset' } }}
              onClick={() => handleChangeName(item)}
            >
              Change
            </Button>
          </HStack>
        ))}
    </VStack>
  );
}
