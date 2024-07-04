import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Text
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { C42_TEXT, C42_GREEN_DARK, C42_GREY } from '@/style/Colors';
import { useGeo } from '@/contexts/GeoContext';
import { getCities } from '@/utils/api/fetch-cities';
import { useWeather } from '@/contexts/WeatherContext';
import { TCity } from '@/types/geo-types';
import shootAlert from '@/utils/shoot-alert';
import { ThemedText } from './ui/ThemedText';

const MIN_GEO_LENGTH = 2;
const MAX_GEO_LENGTH = 100;

const SearchBar = () => {
  const { deviceGeoPosition, setDeviceGeoPosition, getLocation } = useGeo();
  const { fetchWeatherData } = useWeather();
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [citiesData, setCities] = useState<TCity[]>([]);
  const forbiddenSymbols = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/;

  const fetchCitiesData = async (text: string) => {
    try {
      if (text.length === 0) {
        setCities([]);
        return;
      }
      const cities = await getCities(text);
      if (cities) {
        setCities(cities.slice(0, 5)); // todo show no more than 5 suggestions
      } else {
        setCities([]);
        shootAlert(
          'Oops!',
          'Could not find any results for the supplied address or coordinates.'
        );
      }
    } catch (error) {
      setCities([]);
      shootAlert(
        'Error',
        'The service connection is lost. Please check your internet connection or try again later.'
      );
    }
  };

  const handleGeoChange = (text: string) => {
    if (text.length <= MAX_GEO_LENGTH) {
      if (!forbiddenSymbols.test(text)) {
        setSearchText(text);
        if (text.length >= MIN_GEO_LENGTH) {
          fetchCitiesData(text); // Fetch data only when text length is sufficient
        } else {
          setCities([]);
        }
      } else {
        shootAlert(
          'Invalid Character!',
          'Please avoid using special characters in the geo name.'
        );
      }
    } else {
      shootAlert(
        'Maximum Length Reached',
        `Geo name cannot exceed ${MAX_GEO_LENGTH} characters.`
      );
    }
  };

  const clearText = () => {
    setSearchText('');
    setCities([]);
  };

  const handleTextSubmit = async (searchText: string) => {
    if (!searchText) return;

    try {
      const cities = await getCities(searchText.toLowerCase()); // Convert searchText to lowercase for case-insensitive comparison
      if (cities?.length > 0) {
        // Attempt to find exact match for search text
        const foundCity = cities.find(
          (city) => city.name.toLowerCase() === searchText.toLowerCase()
        );

        // Set device geo position based on foundCity or default to the first city in the list
        const selectedCity = foundCity || cities[0];
        setDeviceGeoPosition({
          latitude: selectedCity.latitude,
          longitude: selectedCity.longitude,
          city: selectedCity.name,
          region: selectedCity.admin1 || 'Unknown region',
          country: selectedCity.country || 'Unknown country'
        });
      } else {
        setCities([]);
        shootAlert(
          'Oops!',
          'Could not find any results for the supplied address or coordinates.'
        );
      }
    } catch (error) {
      setCities([]);
      shootAlert(
        'Error',
        'The service connection is lost. Please check your internet connection or try again later.'
      );
    }

    clearText();
  };

  const handleLocationPress = async () => {
    await getLocation();
    clearText();
  };

  const handleCityPress = (city: any) => {
    setSearchText(city.name);
    setCities([]);
    setDeviceGeoPosition({
      latitude: city.latitude,
      longitude: city.longitude,
      city: city.name,
      region: city.admin1 || 'Unknown region',
      country: city.country || 'Unknown country'
    });
  };

  // fetch weather data when deviceGeoPosition changes
  useEffect(() => {
    if (deviceGeoPosition) {
      fetchWeatherData(
        deviceGeoPosition!.latitude,
        deviceGeoPosition!.longitude
      );
    }
  }, [deviceGeoPosition]);

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Pressable onPress={() => handleTextSubmit(searchText)}>
          <Ionicons size={21} name="search" />
        </Pressable>

        <TextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            searchText ? styles.inputWithText : {}
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search Location"
          underlineColorAndroid="transparent"
          value={searchText}
          onChangeText={handleGeoChange} // Update onChangeText to handleGeoChange
          onSubmitEditing={() => handleTextSubmit(searchText)}
          maxLength={MAX_GEO_LENGTH + 1} // Alert user when max length is overflowed
        />

        {searchText ? (
          <Pressable onPress={clearText}>
            <Ionicons
              size={21}
              name="close-circle-outline"
              style={{ color: C42_TEXT }}
            />
          </Pressable>
        ) : null}

        <Pressable onPress={handleLocationPress}>
          <Ionicons size={25} name="location-sharp" />
        </Pressable>
      </View>

      {citiesData.length > 0 && (
        <FlatList
          data={citiesData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: any }) => (
            <Pressable
              style={styles.cityItem}
              onPress={() => handleCityPress(item)}
            >
              <Text style={styles.cityText}>
                <ThemedText type="defaultSemiBold">{item.name}</ThemedText>,{' '}
                {item.admin1}, {item.country}
              </Text>
            </Pressable>
          )}
          style={styles.dropdown}
        />
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 21,
    marginTop: 21,
    gap: 10
  },
  input: {
    padding: 10,
    flex: 1,
    color: C42_TEXT
  },
  inputFocused: {
    borderColor: C42_GREEN_DARK
  },
  inputWithText: {
    fontWeight: 'bold'
  },
  dropdown: {
    position: 'absolute',
    top: 110,
    left: 10,
    right: 10,
    backgroundColor: C42_GREY,
    zIndex: 99991,
    borderRadius: 21,
    maxHeight: 600,
    opacity: 0.95
  },
  cityItem: {
    padding: 15
  },
  cityText: {
    color: C42_TEXT
  }
});
