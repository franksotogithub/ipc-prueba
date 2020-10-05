import { Component, OnInit,Inject } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilHelper } from 'src/app/util/util.helper';
@Component({
  selector: 'app-audio-dialog',
  templateUrl: './audio-dialog.component.html',
  styleUrls: ['./audio-dialog.component.scss']
})
export class AudioDialogComponent implements OnInit {
  time: number = 0;
  interval;

  display


  ngOnInit() {
  }

  
   //Lets initiate Record OBJ
    record;
   //Will use this flag for detect recording
    recording = false;
   //Url of Blob
    url;
    error;
   constructor(private domSanitizer: DomSanitizer,public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any) {

      console.log('this.matDialogData>>>',this.matDialogData);
  
    if(this.matDialogData.audioUrl){
      this.url = this.matDialogData.audioUrl;
    }
   }
   sanitize(url:string){
       return this.domSanitizer.bypassSecurityTrustUrl(url);
   }
   /**
    * Start recording.
    */
   initiateRecording() {
       this.startTimer();
       this.recording = true;
       let mediaConstraints = {
           video: false,
           audio: true
       };
       navigator.mediaDevices
           .getUserMedia(mediaConstraints)
           .then(this.successCallback.bind(this), this.errorCallback.bind(this));
   }
   /**
    * Will be called automatically.
    */
   successCallback(stream) {
       var options = {
           mimeType: "audio/wav",
           numberOfAudioChannels: 1
       };
       //Start Actuall Recording
       var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
       this.record = new StereoAudioRecorder(stream, options);
       this.record.record();
   }
   /**
    * Stop recording.
    */
   stopRecording() {
       this.recording = false;
       this.record.stop(this.processRecording.bind(this));
       this.pauseTimer();
   }
   /**
    * processRecording Do what ever you want with blob
    * @param  {any} blob Blog
    */
   processRecording(blob) {
       this.url = URL.createObjectURL(blob);
   }
   /**
    * Process Error.
    */
   errorCallback(error) {
       this.error = 'Can not play audio in your browser';
   }
   
   confirmar(e){
    (e)?this.dialogRef.close({ audioUrl: this.url}):this.dialogRef.close();
    
   }

   startTimer() {
    console.log("=====>");
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }

      this.display =this.transform(this.time);

    }, 1000);
  }
  pauseTimer() {
    clearInterval(this.interval);
  }


  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
     
    return UtilHelper.zeroPad(minutes,2)  + ':' + UtilHelper.zeroPad((value - minutes * 60),2);
}


}
