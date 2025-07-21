import React, { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
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

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const initialPos = getInitialPosition(card.from);

  useEffect(() => {
    if (isFocused) {
      // Start from initial position
      opacity.value = 0;
      translateX.value = initialPos.x;
      translateY.value = initialPos.y;

      // Animate to final position
      opacity.value = withTiming(1, { duration: 500 });
      translateX.value = withTiming(0, { duration: 500 });
      translateY.value = withTiming(0, { duration: 500 });
    }
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '48%',
        height: 96,
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#ccc', // fallback background in case gradient fails
      }}
      activeOpacity={0.8}
    >
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
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
          <Text style={{ color: '#fff', fontWeight: '600', marginTop: 4 }}>{card.label}</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}
