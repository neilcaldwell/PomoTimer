import { Listbox } from '@headlessui/react';
import { useContext } from "react";
import { Check, Translate } from "phosphor-react";
import { useTranslation } from 'react-i18next';
import LocaleContext from '../../../LocaleContext';
import i18n from '../../../i18n';
import toast from 'react-hot-toast';
import useSound from 'use-sound';
import switch_clean from "../../../assets/sounds/switch_clean.mp3";
import { validate_sound } from '../../../lib/helper';

const languages = [
  { id: 1, name: 'English', value: 'en', unavailable: false },
  { id: 2, name: 'Português', value: 'pt', unavailable: false }
]

interface SetLocaleMenuProps {
  currentTab: number;
}

export function SetLocaleMenu({ currentTab }:SetLocaleMenuProps){
  const { t } = useTranslation();
  const [playSound] = useSound(switch_clean);
  const { locale } = useContext(LocaleContext);

  function changeLocale(l :string):void {
    if (locale !== l) {
      i18n.changeLanguage(l);
      toast.dismiss();
      toast.success(t('update-language'));
      validate_sound(() => playSound());
    }
  }
  
  return (
    <Listbox value={locale} onChange={changeLocale}>
      <div className="transition-all relative mt-1">
        <Listbox.Button className="relative w-full h-10 rounded-lg backdrop-blur-sm bg-white/20 py-2 pl-3 pr-10 cursor-pointer text-left focus:outline-none sm:text-sm">
          <span className="block truncate uppercase text-white font-semibold">{locale}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <Translate size={32} weight="bold" className="h-5 w-5 text-white" aria-hidden="true"/>
          </span>
        </Listbox.Button>
          <Listbox.Options className="absolute right-0 mt-1 max-h-60 w-min overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">
            {languages.map((language, languageIdx) => (
              <Listbox.Option
                key={languageIdx}
                className={ ({ active }) =>
                  `w-100 relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-black/10 text-gray-900' : 'text-gray-900'
                  }`
                }
                value={language.value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {language.name}
                    </span>
                    {selected && (
                      <span className={`absolute inset-y-0 left-0 flex items-center pl-3 text-tab${currentTab == 0 ? "Main" : (currentTab == 1 ? "ShortTime" : "LongTime")}`}>
                        <Check size={32} className="h-5 w-5" aria-hidden="true"/>
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
      </div>
    </Listbox>
  );
}