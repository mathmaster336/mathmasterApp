
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';

const getInitialPosition = (from) => {
  switch (from) {
    case 'topLeft':
      return { x: -50, y: -50 };
    case 'topRight':
      return { x: 50, y: -50 };
    case 'bottomLeft':
      return { x: -50, y: 50 };
    case 'bottomRight':
      return { x: 50, y: 50 };
    default:
      return { x: 0, y: 0 };
  }
};

export default function AnimatedCard({ card, index, onPress }) {
  const isFocused = useIsFocused();

  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) {
      const initialPos = getInitialPosition(card.from);

      // Set initial values
      translateX.setValue(initialPos.x);
      translateY.setValue(initialPos.y);
      opacity.setValue(0);

      // Animate to final position
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFocused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '48%',
        height: 96,
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
      }}
      activeOpacity={0.8}
    >
      <Animated.View
        style={{
          flex: 1,
          opacity,
          transform: [
            { translateX },
            { translateY },
          ],
        }}
      >
        <LinearGradient
          colors={card.colors}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
          }}
        >
          <Ionicons name={card.icon} size={28} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: '600', marginTop: 4 }}>
            {card.label}
          </Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}
