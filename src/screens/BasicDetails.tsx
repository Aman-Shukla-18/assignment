import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../utils/colors'
import { normalize, vh, vw } from '../utils/Dimension'
import Button from '../components/Button'
import screenNames from '../utils/screenNames'

type Props = {}

const BasicDetails = (props: Props) => {
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const onPressNext = () => {
    setLoadingData(true)
    setTimeout(() => {
      props.navigation.navigate(screenNames.PROFESSIONAL_INFO)
    setLoadingData(false)
    }, 500);

  }
  return (
    <View style = {styles.mainContainer}>
      <Button title='Next' onPress={onPressNext} loading = {loadingData} btnStyle={styles.btnContainer} />
    </View>
  )
}

export default BasicDetails

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    paddingTop: vh(30),
    paddingHorizontal: vw(26)

  },
  heading: {
    fontSize: normalize(22),
    color: colors.BLACK,
    fontWeight: 'bold',
    letterSpacing: vw(1)
  },
  btnContainer: {
    width: '100%'
  }
})