import { Button, Center, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import './App.css'
import { Controller, useForm } from 'react-hook-form'
import React, { useRef } from 'react'


const MyInput = React.forwardRef(({value, onChange}, _) => {
  return (
    <VStack>
      <Text>value: {value}</Text>
      <HStack>
        <Button onClick={()=> onChange('A')}>A</Button>
        <Button onClick={()=> onChange('B')}>B</Button>
        <Button onClick={()=> onChange('C')}>C</Button>
        <Button onClick={()=> onChange('D')}>D</Button>
    </HStack>
    </VStack>
  ) 
})


function App() {
  const { register, control, handleSubmit} = useForm();
  const onSubmit = (data) => console.log('submit: ', data)

  let refreshing = false;

  const refresh = () => {
    console.log('start refresh')
    refreshing = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('refreshed')
        refreshing = false;
        resolve(true)
      }, 5000)
    })
  }

  const waitRefresh = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (refreshing) {
          resolve(waitRefresh())
        } else {
          resolve(true)
        }
      }, 1000);
    })
  }

  const callApi = async () => {
    if (refreshing) {
      await waitRefresh();
    }
    console.log('start calling Api')
  }

  return (
    <Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={'test input'} {...register('testField')}/>

        <Controller 
          name='myField'
          control={control}
          render={({field: {value, onChange}} ) => (<MyInput value={value} onChange={onChange}/>)}
        />
        
        <button type="submit">Submit</button>
      </form>

      <Divider />

      <Button onClick={refresh}>Refresh</Button>
      <Button onClick={callApi}>Call api</Button>
    </Center>
  )
}

export default App
