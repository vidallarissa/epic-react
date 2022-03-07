// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'

const useSafeDispatch = (dispatch) => {
  const mountedRef = React.useRef(false)

  React.useLayoutEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return React.useCallback((...args) => {
    if (mountedRef.current)
     dispatch(...args)
  }, [dispatch])
}

// 🐨 this is going to be our generic asyncReducer
function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      // 🐨 replace "pokemon" with "data"
      // return {status: 'pending', pokemon: null, error: null}
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      // 🐨 replace "pokemon" with "data" (in the action too!)
      // return {status: 'resolved', pokemon: action.pokemon, error: null}
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      // 🐨 replace "pokemon" with "data"
      // return {status: 'rejected', pokemon: null, error: action.error}
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const useAsync = (initialState) => {
  // -------------------------- start --------------------------

  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    // 🐨 this will need to be "data" instead of "pokemon"
    data: null,
    error: null,
    ...initialState
  })

  const dispatch = useSafeDispatch(unsafeDispatch)

  const run = React.useCallback(promise => {
     dispatch({ type: 'pending' })
     promise.then(
       data => {
         dispatch({ type: 'resolved', data })
       },
       error => {
         dispatch({ type: 'rejected', error })
       }
     )
  }, [dispatch])

  return { ...state, run }
  // --------------------------- end ---------------------------
}

function PokemonInfo({pokemonName}) {
  // 🐨 move all the code between the lines into a new useAsync function.
  // 💰 look below to see how the useAsync hook is supposed to be called
  // 💰 If you want some help, here's the function signature (or delete this
  // comment really quick if you don't want the spoiler)!
  // function useAsync(asyncCallback, dependencies) {/* code in here */}
  // const asyncCallback = React.useCallback(() => {
  //   if (!pokemonName) {
  //     return
  //   }
  //   return fetchPokemon(pokemonName)
  // }, [pokemonName])

  // 🐨 here's how you'll use the new useAsync hook you're writing:
  // const state = useAsync(
  //   asyncCallback,
  // { status: pokemonName ? 'pending' : 'idle' })

  // 🐨 this will change from "pokemon" to "data"
  // const {pokemon, status, error} = state
  // const {data, status, error} = state
  const { data: pokemon, status, error, run } = useAsync({ 
    status: pokemonName ? 'pending' : 'idle' 
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    const pokemonPromise = fetchPokemon(pokemonName)
  run(pokemonPromise)
}, [pokemonName, run])

  switch (status) {
    case 'idle':
      return <span>Submit a pokemon</span>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw error
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    default:
      throw new Error('This should be impossible')
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true)
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  )
}

export default AppWithUnmountCheckbox
