import React from 'react'

export const Alert = ({children, color="red"}) => {
  switch(color) {
    case 'blue': {
      return (
        <div class="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800 text-center font-semibold" role="alert">
            {children}
        </div>
      )
    }
    case 'green': {
      return (
        <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 text-center font-semibold" role="alert">
            {children}
        </div>
      )
    }
    default: {
      return (
        <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center font-semibold" role="alert">
            {children}
        </div>
      )
    }
  }
}
