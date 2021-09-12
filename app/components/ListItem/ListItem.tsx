import * as React from 'react';
import {Button, Card, Paragraph, IconButton} from 'react-native-paper';
import {ReactNode} from "react";
import {DANGER_COLOR, GREY_COLOR, SUCCESS_COLOR} from "../../utils/styles";
import {StyleSheet} from "react-native";

interface Props {
    title: string
    description: string
    price: number
    pinned: boolean
    setPinned: () => void
    onDeletePressed: () => void
}

interface StarIconProps {
    size: number
}

const ListItem = (props: Props) => {

    const Pinned = (iconProps: StarIconProps): ReactNode => {
        return (
            <IconButton
                {...iconProps}
                size={30}
                icon={props.pinned ? 'star' : 'star-outline'}
                color={props.pinned ? SUCCESS_COLOR : GREY_COLOR}
                onPress={props.setPinned}
            />
        )
    }

    return (
        <Card mode={`outlined`} style={styles.card}>
            <Card.Title
                title={props.title}
                subtitle={`$${props.price}`}
                subtitleStyle={styles.subtitle}
                right={Pinned}
            />
            <Card.Content>
                <Paragraph>{props.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button
                    color={DANGER_COLOR}
                    onPress={() => props.onDeletePressed()}
                >
                    Delete
                </Button>
            </Card.Actions>
        </Card>
    )

};
const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        marginHorizontal: 10
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default ListItem;
