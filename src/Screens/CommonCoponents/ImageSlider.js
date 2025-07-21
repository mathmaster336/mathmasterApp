import React, { useRef, useState, useEffect } from 'react';
import { View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const { width } = Dimensions.get('window');

const images = [
  {
    id: '1',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnuPm3xwrKT-bjFeBgau-8EB8eW7OQd2xtpg&s',
  },
  {
    id: '2',
    uri: 'https://m.media-amazon.com/images/I/81+Eh-enKAL.jpg',
  },
  {
    id: '3',
    uri: 'https://online.fliphtml5.com/xiibz/vwgx/files/large/1.webp?1587347728&1587347728',
  },
];

export default function ImageSlider() {
  const flatListRef = useRef(null);
  const currentIndexRef = useRef(0); // for interval tracking
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      if (newIndex !== null) {
        setCurrentIndex(newIndex);
        currentIndexRef.current = newIndex;
      }
    }
  }).current;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, []); // Run only once on mount

  const goToSlide = (offset) => {
    const newIndex = (currentIndex + offset + images.length) % images.length;
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    setCurrentIndex(newIndex);
    currentIndexRef.current = newIndex;
  };

  return (
    <View className="relative">
      <FlatList
        data={images}
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            style={{ width, height: 200 }}
            className="rounded-md"
            resizeMode="cover"
          />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Left Button */}
      <TouchableOpacity
        onPress={() => goToSlide(-1)}
        className="absolute left-3 top-[40%] bg-black/50 p-2 rounded-full"
      >
        <Entypo name="chevron-left" size={28} color="white" />
      </TouchableOpacity>

      {/* Right Button */}
      <TouchableOpacity
        onPress={() => goToSlide(1)}
        className="absolute right-3 top-[40%] bg-black/50 p-2 rounded-full"
      >
        <Entypo name="chevron-right" size={28} color="white" />
      </TouchableOpacity>

      {/* Indicator Dots */}
      <View className="absolute bottom-2 w-full flex-row justify-center space-x-2">
        {images.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <View
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${isActive ? 'w-10 bg-white' : 'w-4 bg-gray-400'
                }`}
            />
          );
        })}
      </View>
    </View>
  );
}
