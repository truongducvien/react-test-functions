import { HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { i18n, languages } from './config';
import useLanguages from './useLanguages';

export default function LanguageDetector() {
  const { changeLanguage, currentLang } = useLanguages();

  return (
    <VStack>
      <HStack>
        <Text>{i18n.t('title.langChange')}</Text>
        {languages.map((item) => (
          <Image
            key={item.key}
            src={item.icon}
            alt="Flag"
            title={item.title}
            cursor={currentLang === item.key ? 'not-allowed' : 'pointer'}
            opacity={currentLang === item.key ? 0.5 : 1}
            onClick={() => currentLang !== item.key && changeLanguage(item.key)}
          />
        ))}
      </HStack>
      <VStack width={'300px'} h={'100%'} border={'1px dashed brown'}>
        <Heading>{i18n.t('title.langDetector')}</Heading>
        <Text>{i18n.t('label.coolReact')}</Text>
      </VStack>
    </VStack>
  );
}
