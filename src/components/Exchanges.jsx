import React,{useEffect , useState}  from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, VStack,Image, Heading , Text } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
//jb tk pura data fectch ne ho jaata loading true rhege  and uske baad loading false ho jayege
const Exchanges = () => {
    const [exchanges,setExchanges] = useState([])
    const[loading,setloading] = useState(true)
    const[error,setError] = useState(false)
    useEffect(() => {
      
        
    
      const fetchexchanges = async() =>{
        try {
          const {data} = await axios.get(`${server}/exchanges`)
        setExchanges(data)
        setloading(false)
        console.log(data.name)
          
        } catch (error) {
          setError(true)
          setloading(false)

          
        }
      }
      fetchexchanges()
      
    }, [])

    if(error)
    return <ErrorComponent message = {"error while fatching exchanges"}/>
    
  return (
    <Container maxW={'container.xl'}>
        {loading ? <Loader/> :<>
        
        <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
           
            {exchanges.map((i)=>(
                <ExchangeCard 
                key={i.id}
                name ={i.name} 
                img={i.image}
                 rank={i.trust_score_rank}
                  url={i.url}
                  />

            )
            )
           }
        </HStack>
        
        
        
        
        </>}

    </Container>
  )
}

const ExchangeCard =({name,img,rank,url}) =>
(
    <a href={url} target={'blank'}>
        <VStack w={"52"} shadow={'lg'}p={'8'} borderRadius={'lg'} transition={"all 0.3s"} m={"4"}
        css = {{
          "&:hover":{
            transform:"scale(1.1)"
          }
        }}
        >
            <Image src={img}
            w={"10"}
            h={"10"}
            objectFit={"contain"}
            alt={"Exchange"}
            
            
            
            />

           <Heading size={"md"} noOfLines={1}>
            {rank}
           </Heading>
           <Text>{name}</Text>
        </VStack>

    </a>
);

export default Exchanges;