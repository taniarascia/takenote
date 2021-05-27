import React, { Fragment, useState } from 'react'
import { Pause, Play, Square } from 'react-feather'
import Speech from 'speak-tts'
import removeMd from 'remove-markdown'


const initSpeechTTS = () => {
  const speech = new Speech()
  console.log('Speech: initializing..');

  speech.init({
    'volume': 1,
    'lang': 'en-GB',
    'rate': 1,
    'pitch': 1,
    'voice': 'Google UK English Male',
    'splitSentences': true,
    'listeners': {
      'onvoiceschanged': (voices) => {
        console.log("Event voiceschanged", voices)
      }
    }
  }).then((data: any) => {
    // The 'data' object contains the list of available voices and the voice synthesis params
    console.log('Speech: init success : ', data)
  }).catch((e: any) => {
    console.error('Speech: init failed : ', e)
  })

  return speech
}


export interface TTSBarProps {
  text: String
}

enum Status {
  idle,
  playing
}


export const TTSBar: React.FC<TTSBarProps> = ({ text }) => {

  const [speech] = useState(initSpeechTTS)
  const [status, setStatus] = useState(Status.idle)

  text = removeMd(text)
  
  return (
    <Fragment>
      <button
        className='note-menu-bar-button uuid'
        onClick={() => {
          if (status === Status.idle) {
            speech.speak({
              text: text,
              queue: false, // current speech will be interrupted
              listeners: {
                onend: () => {
                  console.log("End utterance")
                  setStatus(Status.idle)
                },
                onstart: () => {
                  console.log("Start utterance")
                  setStatus(Status.playing)
                },
              }
            })
          }

          if (status === Status.playing) {
            speech.cancel()
          }
        }}
      >
        {status === Status.idle && <Play size={18}></Play>}
        {status === Status.playing && <Square size={18}></Square>}
      </button>
    </Fragment>
  )
}