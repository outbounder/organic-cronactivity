var DNA = require("organic").DNA
var Organel = require("organic").Organel
var _ = require("underscore")
var path = require("path")
var prefix = require("prefixobjpropertyvalues")
var Job = require("cron").CronJob

module.exports = Organel.extend(function(plasma, dna){
  dna = new DNA(dna)

  if(dna.cwd) {
    prefix(dna.cwd, dna.cwd_prefix || process.cwd(), path.join)
    dna.mergeBranchInRoot("cwd")
  }

  Organel.call(this, plasma, dna)

  if(dna.main)
    this.start(dna)
  this.on("kill", this.stop)
},{
  start : function(dna){
    var self = this
    var activity = require(dna.main)
    if(!dna.cronTime)
      throw new Error("cronTime required in dna")

    this.job = new Job({
      cronTime: dna.cronTime,
      start: true,
      onTick: function(){
        activity(self.plasma, dna)
      },
      onComplete: function(){
        if(self.config.onCompleteType)
          self.emit({type: self.config.onCompleteType})
      },
      timeZone: dna.timeZone
    })
    if(this.config.log)
      console.log("cronactivity", 
        path.basename(this.config.main), "->", this.config.cronTime)
  },
  stop: function(){
    this.job && this.job.stop()
    return false
  }
})