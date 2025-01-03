import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

const ErrorAlert = ({error}:{error:Error}) => {
  return (
      <div className="flex  mx-auto">
          <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{`${error}`}</AlertDescription>
          </Alert>
      </div>
  )
}

export default ErrorAlert