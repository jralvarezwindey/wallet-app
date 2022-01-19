import * as React from 'react';


import {

  Box,
  Button,
  IconButton,
  Stack,Text,
  ChevronLeftIcon,
  Center,
  ScrollView,
  
} from 'native-base';
import { useSelector, useDispatch} from 'react-redux';
import Tokens from './components/Tokens';
import { useState, useEffect } from 'react';
import { Pressable, RefreshControl } from 'react-native';
import {useFocusEffect } from '@react-navigation/native';
import { getBalance } from '../../redux/actions';


export default function UserCriptos({navigation}) {
  const dispatch = useDispatch();
 const balance = useSelector(state => state.userData.balance)
 const [balanceUSD, setBalanceUsd] = useState("");
 const [currencies, setCurrencies] = useState([])
 const [refreshing, setRefreshing] = useState(false);
 const blockChain = useSelector(state => state.blockChain);
 
 React.useEffect( () => {

  if(blockChain === "stellar"){
    let usd
    if(balance.stellar) usd = balance.stellar.balanceUsd
    if(usd) usd = parseFloat(usd).toFixed(2);
    setBalanceUsd(usd)
    setCurrencies(balance.stellar.currencies)
  }else if ("ethereum"){
    let usd
    if(balance.ethereum) usd = balance.ethereum.balanceUsd
    if(usd) usd = parseFloat(usd).toFixed(2);
    setCurrencies(balance.ethereum.currencies)
    setBalanceUsd(usd)
}},[balance,blockChain])



 useFocusEffect(
  React.useCallback(() => {
    try{
    dispatch(getBalance())

  }catch(e){
    console.log("fail balance")
  }
  
    return  () => {
 };
  }, []));



return (
<>    
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={()=>{dispatch(getBalance())}}
          />}
        
      >
           <Box
          mt="50px"
          py="1"
          
          rounded="md"
          alignSelf="center"
          width={375}
          maxWidth="100%"
         
          >

          <Stack direction="row" alignItems="center">
          <Pressable   onPress={()=> navigation.goBack()}>
          <ChevronLeftIcon color="darkBlue.900" size="9"/>
          </Pressable>
             <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" > YOUR BALANCE </Text> 
          </Stack>
          </Box>
          
          <Box alignSelf="center" alignItems="center" >
          <Text color="darkBlue.900" fontWeight="bold" fontSize="6xl"> ${balanceUSD} </Text>
          <Box
             bg="darkBlue.900"
             py="5"
             px="1"
             mb={0.2}
             mt={0.5}
            shadow={9}
             rounded="md"
             alignSelf="center"
             width={375}
             alignItems="center"
             maxWidth="100%"
             maxHeight="100%"
          >
            <Text color="white" fontWeight="bold" fontSize="lg" pb="1">
            Currencies:
            </Text>
      </Box>
          </Box>
          
         <ScrollView mt="5">
           {currencies?.map((element, index)=>{
             return ( <Tokens key={index} currency={element.currency} amount={element.amount} nav={navigation}/>)

           })}
           
          </ScrollView>
       {/*  </Box>  */}

        
       </ScrollView>
      </>
 
  );
}