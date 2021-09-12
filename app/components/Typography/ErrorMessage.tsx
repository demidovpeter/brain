import * as React from 'react'
import {Paragraph} from "react-native-paper";
import {DANGER_COLOR} from "../../utils/styles";

interface Props {
    text: string
}

const ErrorMessage = (props: Props) => {
  return (
      <Paragraph style={{color: DANGER_COLOR, marginHorizontal: 10}}>{props.text}</Paragraph>
  )
}

export default ErrorMessage
