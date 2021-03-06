import React,{useState, useEffect} from 'react';
import {
    Container, 
    FormTextAltura, 
    FormTextPeso
} from './styles';
import { 
    View,
    TextInput, 
    TouchableOpacity, 
    Text, 
    Dimensions, 
    StyleSheet,
    Animated, 
    Image 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import  ImcCalculator from '../../Model/ImcCalculator';

import Body from '../Body';

Icon.loadFont()
const { height } = Dimensions.get('window')

//----------------------------------------------------------------------------------------------
const Modal = ({ show, close }) =>{
    const [state, setState] = useState({
      opacity: new Animated.Value(0),
      container: new Animated.Value(height),
      modal: new Animated.Value(height)
    })
  
    const openModal = () => {
      Animated.sequence([
        Animated.timing(state.container, { toValue: 0, duration: 100 }),
        Animated.timing(state.opacity, { toValue: 1, duration: 300 }),
        Animated.spring(state.modal, { toValue: 0, bounciness: 5, useNativeDriver: true })
      ]).start()
    }
  
    const closeModal = () => {
      Animated.sequence([
        Animated.timing(state.modal, { toValue: height, duration: 250, useNativeDriver: true }),
        Animated.timing(state.opacity, { toValue: 0, duration: 300 }),
        Animated.timing(state.container, { toValue: height, duration: 100 })
      ]).start()
    }
  
    useEffect(() => {
      if(show){
        openModal()
      }else{
        closeModal()
      }
    }, [show])



    return( 
        <Animated.View 
          style={[styles.container, {
            opacity: state.opacity,
            transform: [
              { translateY: state.container }
            ]
          }]}
        >
          <Animated.View 
            style={[styles.modal, {
              transform: [
                { translateY: state.modal }
              ]
            }]}
          >
            <View style={styles.indicator} />
    
            <Image 
                source={require('../../images/alturaDog.png')} 
                style={{marginVertical:30,marginLeft:35, opacity:1}} 
            />
            <Text
                style={{color:'#000', fontWeight:'bold', marginVertical:20}}
            >
                A altura do cão pode ser medida utilizando uma fita métrica que começa da cabeça e vai até a pata traseira do cão.{'\n'}Como é mostrado na Figura acima.
            </Text>
            
            
            <TouchableOpacity style={styles.btn} onPress={close}>
              <Text style={{ color: '#fff', fontWeight:'bold'}}>Fechar</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
    )

}
//-----------------------------------------------------------------------------------------------


// export interface dogData{
//   weightdog:String;
//   heightdog:String;
// }

//-----------------------------------------------------------------------------------------------
export default function Forms(){
    const [modal, setModal] = useState(false)
    const [heightDog, setHeightDog] = useState(0)
    const [weightDog, setWeightDog] = useState(0)
    const [response, setResponse ] = useState(false)

    const imc = ImcCalculator.imc()

    const portDog = (weight_dog) =>{
      if(weight_dog<10){
        return 0
      }
      else if(weight_dog>=10  && weight_dog < 25){
        return 1
      }
      else{
        return 2
      }
    }
    return(
        <Container>
            <View style = {styles.viewAltura}>
                <FormTextAltura
                  onChangeText={e=>{setHeightDog(e)}}
                  value={heightDog}
                />
                <Icon 
                    name="help" 
                    size={40} 
                    color='#fdf5e6' 
                    style={styles.iconHelp}
                    onPress={()=>{
                        /*console.log('Pressionou Help...')*/
                        setModal(true)
                    }}
                /> 
            </View>
            <FormTextPeso 
              value={weightDog}
              onChangeText={e=>{setWeightDog(e)}}
            />

            {/* <input type="text" placeholder="Digite o Peso aqui" name="weightDog" onChange={e =>setWeightDog(e.target.value)}/> */}

            <Modal
                show={modal}
                close={()=>setModal(false)}
            />
          
            <TouchableOpacity
            style={styles.Button}
            disabled={true?modal==true:false}
            //activeOpacity={2}
            onPress={()=>{ 
              console.log( imc.imc_calculator( Number(weightDog), Number(heightDog), portDog(Number(weightDog)) ) )

            }}
            >
            <Text
                style={styles.textButton}
            >
                Calcular
            </Text>
            </TouchableOpacity>
        </Container>
    );
}

const styles = StyleSheet.create({

    weightInput:{
      borderWidth:2, 
      borderColor:'#f92f00', 
      borderRadius: 12, 
      margin: 12,
      marginTop:0,
      width:'85%',
      color:'white',
      backgroundColor:'#000842',
    },
    iconHelp:{
        padding:0,
        marginTop:50,
        justifyContent:'center',
        marginBottom:0,
        position: 'relative',
        
    },
    viewAltura:{
        flex:1, 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center',
        height:Dimensions.get('window').height*0.05,
        padding:5,
        position: 'relative',
        elevation:0,
    },
    Button: {
        height: Dimensions.get('window').height*0.05,
        backgroundColor:'#e62b00',
        textAlign:'center',
        borderRadius:8,
        justifyContent:'center',
        marginLeft:30,
        marginTop:Dimensions.get('window').height*0.30,
        width:Dimensions.get('window').width*0.80,
        position: 'relative',
        elevation:0,
    },
    textButton:{
        textAlign:'center', 
        justifyContent:'center',
        fontSize:16,
        fontWeight:'bold',
        color:'white'
    },
    container: {
        width: '100%',
        height: '100%',
        flex:1,
        //width:Dimensions.get('window').width,
        //height:Dimensions.get('window').height,
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        zIndex:4,
        elevation:4,
      },
      modal: {
        bottom: 0,
        position: 'absolute',
        height: '100%',
        //height:Dimensions.get('window').height,
        backgroundColor: 'white',
        //opacity:0.7,
        width: '100%',
        //borderTopLeftRadius: 20,
        //borderTopRightRadius: 20,
        borderRadius:20,
        paddingLeft: 25,
        paddingRight: 25,
        //marginBottom:Dimensions.get('window').height*0.08,
        borderColor:'#f92f00',
        borderWidth:1,
        marginBottom:0,
        paddingBottom:0,
      },
      indicator: {
        width: 50,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 5
      },
      text: {
        marginTop: 50,
        textAlign: 'center'
      },
      btn: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#f92f00',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        fontWeight:'bold',
      }
})