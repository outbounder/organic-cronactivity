# crontactivity organelle

Provides ability to a cell for running given activity on specified by crontime format periods.

## install

    npm install organic-cronactivity --save

## dna

    {
      "source": "node_modules/cronactivity",
      "cwd": {
        "main": "dir/relative/to/cwd/activity"
      },
      "cronTime": "42 * * * * *",


      "customProperty": "Example run every 42 seconds"
    }

## activity.js

    module.exports = function(plasma, dna){
      console.log(dna.customProperty) // Example run every 42 seconds
    }

## reacts to chemical `kill`
Stops the cron activity

## Notes
Starts the cron activity during organelle initialization using [`cron`](https://github.com/ncb000gt/node-cron) package