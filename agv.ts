export interface SysFunction {
    id: string;
    params: {
        [key: string]: {
            P: number;
            type: "number" | "string" | "boolean";
            regex?: RegExp;
        };
    };
}

export const funcToId: Record<string, SysFunction> = {
    wait: {
        id: "00001",
        params: {
            millesimi: {
                P: 1,
                type: "number",
                regex: /^(?:[1-9]|1\d|2[0-9]|30)$/,
            },
            centesimi: {
                P: 2,
                type: "number",
                regex: /^(?:[1-9]|[1-9][0-9]|[1-2][0-9]{2}|300)$/,
            },
            decimi: {
                P: 3,
                type: "number",
                regex: /^(?:[1-9]|[1-9]\d{1,2}|[1-2]\d{3}|3000)$/,
            },
            seconds: {
                P: 4,
                type: "number",
                regex: /^(?:[1-9]|[1-9]\d{1,3}|[1-2]\d{4}|30000)$/,
            },
            jumpto: {
                P: 5,
                type: "number",
            },
            async: {
                P: 6,
                type: "boolean",
            },
            actionStartButton: {
                P: 7,
                type: "boolean",
            },
        },
    },
    blindMovement:{
        id: "00002",
        params: {
            steerPosition: {  
                // Steering position at start of movement ( )              
                //     90 = Straight
                //     0 = Rotation to the right
                //     180 = Rotation to the left 
                //     <0 or >180 = Maintain current orientation     
                P: 1,
                type: "number",
                regex: /^(?:[0-9]|[1-9]\d|[12][0-9]{2}|3[0-5][0-9]|360)$/,//0-360
            },
            centimetri: {
                //Distance/Position expressed in cm
                P: 2,
                type: "number",
            },
            positionStearAfterMovement: {
                //Steering position at the end of movement ( )
                P: 3,
                type: "number",
                regex: /^(?:[0-9]|[1-9]\d|[12][0-9]{2}|3[0-5][0-9]|360)$/,//0-360
            },
            movementType: {
                // 0 = at the end of the movement the AGV will stop, resetting the position
                // 1 = search for color 1
                // 2 = search for color 2
                // 3 = search for color 3
                // 4 = Reverse movement 
                P: 4,
                type: "number",
                regex: /^(0|[1-4])$/,//0-4
            },
            laser: {
                //Laser area: set at the beginning of the line
                P: 5,
                type: "number",
                regex: /^(0|[1-8])$/,//0-8
            },
            speed: {
                //Driving speed
                P: 6,
                type: "number",
                regex: /^(0|[1-9][0-9]?|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,//0-100
            },
            positionSecondMotorWheel: {
                //Distance/Position expressed in cm (2nd motor wheel)
                P: 7,
                type: "number",
                regex: /^(?:[0-9]|[1-9]\d|[12][0-9]{2}|3[0-5][0-9]|360)$/,//0-360
            },
        },
    },
    moveOnColor:{
        id: "00003",
        params: {
            Color: {
                //color 1 = red  ======= MAYBE STRING IS BETTER CHOICE
                //color 2 = green
                //color 3 = blue
                P: 1,                       
                type: "number",             
                regex: /^(0|[1-3])$/,       
            },
            centimetri: {
                //Distance/Position expressed in cm
                P: 2,
                type: "number",
            },
            movementType: {
                // 0 = after the set distance the AGV will stop, resetting the position
                // 1 = same as 0 but the position is not reset
                // 2 = the indicated position is not a destination but the position in which the transition to the next program line occurs. The position is not reset
                // 3 = the indicated position is not a destination but the position in which the transition to the next program line occurs. The position is reset
                // +10 The movement of the tow is not absolute but relative
                // +100 Invert master compared to last acquisition (CMD19)
                // +200 Twin Tow Move
                // +400 Opposite movement of the tow
                // +800 Twin steering movement
                // +1600 Opposite steering movement
                // +3200 Lateral movement (disables speed reduction for steering position)
                // +6400 Use dual cameras
                P: 3,
                type: "number",
            },
            destionationVar: {
                // Nr. della VR contenente la destinazione (se =0 viene considerato P2)
                P: 4,
                type: "number",
            },
            laser: {
                //Laser area: set at the beginning of the line
                P: 5,
                type: "number",
                regex: /^(0|[1-8])$/,
            },
            speed: {
                //Driving speed
                P: 6,
                type: "number",
                regex: /^(0|[1-9][0-9]?|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
            },
            anticipationNextColor: {
                // Line change anticipation (cm)
                P: 7,
                type: "number",
            },
        },
    },
    moveAndChangeColor:{
        id: "00004",
        params: {
            Color: {
                //color 1 = red  ======= MAYBE STRING IS BETTER CHOICE
                //color 2 = green
                //color 3 = blue
                P: 1,                       
                type: "number",             
                regex: /^(0|[1-3])$/,       
            },
            MovementType: {
               //+100 Invert master compared to last acquisition (CMD19)
               //  +200 Twin Tow Move
               //  +400 Opposite movement of the tow
               //  +800 Twin steering movement
               //  +1600 Opposite steering movement
               //  +3200 Lateral movement (disables speed reduction for steering position)
               // +6400 Use dual cameras
                P: 2,
                type: "number",
            },
            minimalRange: {
                //minimal range cm
                P: 3,
                type: "number",
            },
            maxRange: {
                //max range cm
                P: 4,
                type: "number",
            },
            laser: {
                //Laser area: set at the beginning of the line
                P: 5,
                type: "number",
                regex: /^(0|[1-8])$/,
            },
            speed: {
                //Driving speed
                P: 6,
                type: "number",
                regex: /^(0|[1-9][0-9]?|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
            },
            speedDuringSearch: {
                //Line change anticipation
                P: 7,
                type: "number",
            },
        },
    },
    moveOnColorAndSearchPlate:{
        id: "00005",
        params: {
            Color: {
                //color 1 = red  ======= MAYBE STRING IS BETTER CHOICE
                //color 2 = green
                //color 3 = blue
                P: 1,                       
                type: "number",             
                regex: /^(0|[1-3])$/,       
            },
            minimalRange: {
                //minimal range cm
                P: 2,
                type: "number",
            },
            maxRange: {
                //max range cm
                P: 3,
                type: "number",
            },
            distanceAfterFindPlate: {
                // Distance to travel after finding the plate (mm) 
                // (if greater than 30000 example 30047-30000 = 47 vr(47) = movement from VR)
                P: 4,
                type: "number",
            },
            laser: {
                //Laser area: set at the beginning of the line
                P: 5,
                type: "number",
                regex: /^(0|[1-8])$/,
            },
            speed: {
                //Driving speed
                P: 6,
                type: "number",
                regex: /^(0|[1-9][0-9]?|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
            },
            speedDuringSearch: {
                // Line change anticipation (cm)
                P: 7,
                type: "number",
            },
        },
    },
    jumpList:{
        id: "00007",
        params: {
            Vr: {
                //Variable to test
                P: 1,                       
                type: "number",    
                regex: /^(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|1[9][0-9]|19[0-2])$/,//1-192             
            },
            LineToJump: {
                //line programmam for VrP1
                P: 2,
                type: "number",
            },
            free3: {
                //line programmam for VrP1
                P: 3,
                type: "number",
            },
            free4: {
                //line programmam for VrP1
                P: 4,
                type: "number",
            },
            free5: {
                //line programmam for VrP1
                P: 5,
                type: "number",
            },
            free6: {
                //line programmam for VrP1
                P: 6,
                type: "number",
            },
            free7: {
                //line programmam for VrP1
                P: 7,
                type: "number",
            },
        },
    },

    waitVariable:{//Wait for/check entry
        id: "00008",
        params: {
            inputSignal: {
                //Example  I1.0=10  I4.7=47
                //If =0 waith start button
                P: 1,                       
                type: "number",                
            },
            state: {
                // 0 = off
                // 1 = on
                P: 2,
                type: "number",
            },
            timeOutWait: {//seconds
                P: 3,
                type: "number",
            },
            actionButtonStart: {
                // 0 = none
                // 1 = unlock by moving to the next line
                // 2 = simulates the true condition
                P: 4,
                type: "number",
            },
            ifTrueJumpToLine: {
                P: 5,
                type: "number",
            },
            subRoutine: {
                // Subroutine call if condition true
                P: 6,
                type: "number",
            },
            mode: {
                // 0 = Disable permanent control
                // 1 = Enable permanent control
                // 2 = Instant control
                // +10 = Stop on true condition
                // +x00 = If true, display UsrText x
                P: 7,
                type: "number",
            },
        },
    },
    if:{
        id: "00009",
        params: {
            var: {
                // No. of the variable to test (1-192)
                P: 1,                       
                type: "number",  
                regex:/^(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|1[9][0-9]|19[0-2])$/,              
            },
            constantValue: {//INT comparison value from constant
                P: 2,
                type: "number",
            },
            valueOfVar: {//Value from variable (1-192) if P3 = 0 P2 is used
                P: 3,
                type: "number",
                regex:/^(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|1[9][0-9]|19[0-2])$/,
            },
            comparationType: {
                // Type of comparison to perform
                // 1 Var1 = Var2
                // 2 Var1 <> Var2
                // 3 Var1 < Var2
                // 4 Var1 <= Var2
                // 5 Var1 > Var2
                // 6 Var1 >= Var2
                P: 4,
                type: "number",
            },
            startButtonAction: {
                // 0 = None
                // 1 = Unlock by moving to the next line
                // 2 = Unlock by simulating true condition
                // >9 Wait time-out (ms) then moves to the next line
                P: 5,
                type: "number",
            },
            subRoutine: {
                // Jump to line if condition true
                P: 6,
                type: "number",
            },
            callSubFunction: {
                // Subroutine call if condition true
                // Note: If P6 and P7 are at 0, the program continues to the next line
                P: 7,
                type: "number",
            },
        },
    },
    setVar:{
        id: "00010",
        params: {
            operationType: {
                // 0 = none
                // 1 = copy
                // 2 = sum
                // 3 = subtraction
                // 4 = multiplication
                // 5 = division
                // 6 = lower between Val1 and Val2
                // 7 = greater between Val1 and Val2
                // 8 = average value between Val1 and Val2
                // 9 = AND Word
                // 10 = OR Word
                // 11 = XOR Word
                // 12 = MOD
                P: 1,                       
                type: "number",  
                regex:/^(?:0|[1-9]|1[0-2])$/,              
            },
            //////////////////////////////////////////RENAME NEDED
            varDestination: {//VarDestionation 65-192
                P: 2,
                type: "number",
                regex:/^(?:6[5-9]|7[0-9]|8[0-9]|9[0-9]|1[0-9][0-9]|19[0-2])$/
            },
            varSorgent1: {//Var1 Source variable 1 (1-192)
                P: 3,
                type: "number",
                regex:/^(?:0|[1-9]|[1-9][0-9]|1[0-9][0-9]|1[9][0-9]|1[9][0-9]|19[0-2])$/,
            },
            constValue1: {//Cost1 Constant value if Var1=0
                P: 4,
                type: "number",
                
            },
            varSorgent2: {
                P: 5,
                type: "number",
            },
            constValue2: {
                P: 6,
                type: "number",
            },
            free: {
                P: 7,
                type: "number",
            },
        },
    },
    requestZone:{
        id: "00011",
        params: {
            WantZone: {
                P: 1,                       
                type: "number",                
            },
            nrVar: {
                P: 2,
                type: "number",
            },
            freeZoneJumpLine: {
                P: 3,
                type: "number",
            },
            occupedZoneJumpLine: {
                P: 4,
                type: "number",
            },
            aGV99: {
                // /with this parameter set to 1 the system assigns the zones to a fictitious AGV (AGV99)
                P: 5,
                type: "number",
            },
            zoneDirection: {
                //Defines a zone direction (if greater than 1000 example 1039-1000=39 vr(39)=zone direction)
                P: 6,
                type: "number",
            },
            Delay: {
                //Wait time-out then move to the next line (0=no time-out)
                P: 7,
                type: "number",
            },
        },
    },
    releaseZone:{
        id: "00012",
        params: {
            numberZone: {//Nr. Zone that is being released
                P: 1,                       
                type: "number",                
            },
            nrVarcontainZone: {
                P: 2,
                type: "number",
            },
            free3: {
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    hookCommand:{
        id: "00013",
        params: {
            timeToOpen: {//sec
                P: 1,                       
                type: "number",                
            },
            timetoClose: {//sec
                P: 2,
                type: "number",
            },
            WaitSensorOpen: {  
                // If 0 I just wait time
                // If 1 I wait time after sensor
                P: 3,
                type: "number",
                regex: /^(0|1)$/,
            },
            waitSensorClose: {
                // If 0 I just wait time
                // If 1 I wait time after sensor
                P: 4,
                type: "number",
                regex:/^(0|1)$/,
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    hornControl:{
        id: "00014",
        params: {
            timeOn: {//sec
                P: 1,                       
                type: "number",                
            },
            timeOff: {//sec
                //0 = at the end of Time on I move to the next line
                P: 2,
                type: "number",
            },
            numberRepetition: {  
                //No. Repetitions (0 = non stop I immediately move to the next row)
                P: 3,
                type: "number",
            },
            execute: {
                // 0 = asynchronous (immediately move to the next line)
                // 1 = synchronous (wait for repetitions to complete)
                // If non-stop repetitions, asynchronous command is forced
                P: 4,
                type: "number",
                regex:/^(0|1)$/,
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    warningUser:{
        id: "00015",
        params: {
            timeToOpen: {
                // No. of text to display (0=Delete)
                P: 1,                       
                type: "number",                
            },
            free2: {
                P: 2,
                type: "number",
            },
            free3: {
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    stopFlag:{
        id: "00016",
        params: {
            free1: {
                P: 1,                       
                type: "number",                
            },
            free2: {
                P: 2,
                type: "number",
            },
            free3: {
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    moveWithCrossroad:{//RENAME NEDED
        id: "00017",
        params: {
            Color: {
                //color 1 = red  ======= MAYBE STRING IS BETTER CHOICE
                //color 2 = green
                //color 3 = blue
                P: 1,                       
                type: "number",             
                regex: /^(0|[1-3])$/,       
            },
            direction: {
                // Direction at the crossroads 0=SX 1=DX
                // +10 = Hold LH before minimum position
                // +20 = Keep right before the minimum position
                P: 2,
                type: "number",
            },
            minimalPosition: {
                // Minimum position to reach expressed in cm
                P: 3,
                type: "number",
            },
            maxPostition: {
                 // Maximum position to reach expressed in cm
                P: 4,
                type: "number",
            },
            laser: {
                //Laser area: set at the beginning of the line
                P: 5,
                type: "number",
                regex: /^(0|[1-8])$/,
            },
            speed: {
                //Driving speed
                P: 6,
                type: "number",
                regex: /^(0|[1-9][0-9]?|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
            },
            speedWhileSearch: {
                P: 7,
                type: "number",
            },
        },
    },
    setStatemissionOrNumberPath:{
        id: "00018",
        params: {
            pathNumber: {
                P: 1,                       
                type: "number",                 
            },
            stationNumber: {
                // Direction at the crossroads 0=SX 1=DX
                // +10 = Hold LH before minimum position
                // +20 = Keep right before the minimum position
                P: 2,
                type: "number",
            },
            deliverySucces: {
                P: 3,
                type: "number",
            },
            collectionMade: {
                P: 4,
                type: "number",
            },
            readyforDelivery: {
                P: 5,
                type: "number",
            },
            newPositionPath: {//cm
                P: 6,
                type: "number",
            },
            pathFromVar: {
                P: 7,
                type: "number",
            },
        },
    },
    detectAgvOrientationandColor:{
        id: "00019",
        params: {
            colorCombinationM1: {
                P: 1,                       
                type: "number",                 
            },
            colorCombinationM2: {
                P: 2,
                type: "number",
            },
            free3: {
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            masterForcer: {//NEED RENAME
                    //Master force (1=M1 2=M2)
                    // 1st digit = Color of M1
                    // 2nd digit = Color of M2
                    // Outcome in VR51
                    // If all param.=0 in VR52 mem. color combination outcome
                P: 7,
                type: "number",
            },
        },
    },
    sendMasterCall:{
        id: "00020",
        params: {
            idStation: {
                // if >1000 the data is read in VR(P1-1000)
                P: 1,                       
                type: "number",                 
            },
            origin: {
                P: 2,
                type: "number",
            },
            destination: {
                P: 3,
                type: "number",
            },
            type: {
                P: 4,
                type: "number",
            },
            reason: {
                P: 5,
                type: "number",
            },
            pieces: {//cm
                P: 6,
                type: "number",
            },
            packager: {
                P: 7,
                type: "number",
            },
        },
    },
    setOutputPlc:{
        id: "00021",
        params: {
            nrExit: {
                P: 1,                       
                type: "number",             
            },
            state: {
                // 0 = off
                // 1 = on
                P: 2,
                type: "number",
                regex:/^(0|1)$/, 
            },
            impulsmiliseconds: {
                //if > 0 the indicated status is pulsed)
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {//cm
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    moveForwardBackOnColorAndPlaceSearch:{
        id: "00022",
        params: {
            color: {
                //color 1 = red  ======= MAYBE STRING IS BETTER CHOICE
                //color 2 = green
                //color 3 = blue
                P: 1,                       
                type: "number",             
                regex: /^(0|[1-3])$/,       
            },
            minimalRange: {
                P: 2,
                type: "number",
            },
            maxRange: {
                P: 3,
                type: "number",
            },
            movementType: {
                //  0: forward movement
                //  1: backward movement
                //  2: enable/disable plate search  
                P: 4,
                type: "number",
            },
            laser: {
                //Laser area: set at the beginning of the line
                P: 5,
                type: "number",
                regex: /^(0|[1-8])$/,
            },
            speed: {
                //Driving speed
                P: 6,
                type: "number",
                regex: /^(0|[1-9][0-9]?|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
            },
            speedDuringSearch: {
                P: 7,
                type: "number",
            },
        },
    },
    jumpToLine:{
        id: "00037",
        params: {
            nrLineToJump: {     
                P: 1,                       
                type: "number",           
            },
            nrProgramtoJump: {
               //No. of program to jump to (if 0 remains in the current program)
                P: 2,
                type: "number",
            },
            nrVarContaininJumpLine: {
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {//cm
                P: 6,
                type: "number",
            },
            End: {
                //reset call vr(26)
                P: 7,
                type: "number",
            },
        },
    },
    subRoutineCall:{
        id: "00038",
        params: {
            nrLineStartProgramm: {     
                P: 1,                       
                type: "number",           
            },
            nrProgrammToJump: {
                //use 0 if current PRG
                P: 2,
                type: "number",
            },
            free3: {
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {//cm
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    callBackSubRoutine:{
        id: "00039",
        params: {
            free1: {     
                P: 1,                       
                type: "number",           
            },
            free2: {
                P: 2,
                type: "number",
            },
            free3: {
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {//cm
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    setVehiclePosition:{//NEED RENAME MAYBE
        id: "00040",
        params: {
            newPosition: {     
                // / New position expressed in cm
                P: 1,                       
                type: "number",           
            },
            AGVInHome: {
                P: 2,
                type: "number",
            },
            X: {
                //only in Cartesian systems
                P: 3,
                type: "number",
            },
            Y: {
                //only in Cartesian systems
                P: 4,
                type: "number",
            },
            P5: {
                //O (0.1 ) (only in Cartesian systems) - 0 = X axis
                P: 5,
                type: "number",
            },
            free6: {
                // Index for acquiring new position from recovery point table
                // (if = use P3, P4, P5)
                P: 6,
                type: "number",
            },
            nrVarContaineIndex: {
                //No. VR containing index (if 0 use P6)
                // If P3 and P4 are at 0 (position physically not possible in Cartesian system)
                // on the 1500 P1 and P2 are updated to Pos.Act.
                P: 7,
                type: "number",
            },
        },
    },
    autoOff:{
        id: "00041",
        params: {
            free1: {     
                P: 1,                       
                type: "number",           
            },
            free2: {
                P: 2,
                type: "number",
            },
            free3: {
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {//cm
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    setLaserArea:{
        id: "00042",
        params: {
            setAreaLaser1: {     
                P: 1,                       
                type: "number",           
                regex: /^(0|[1-8])$/,
            },
            setAreaLaser2: {
                P: 2,
                type: "number",
                regex: /^(0|[1-8])$/,
            },
            setAreaLaser3: {
                P: 3,
                type: "number",
                regex: /^(0|[1-8])$/,
            },
            operationType1: {
                // 0 = none
                // 1 = enable front ultrasound
                // 2 = disable front ultrasound
                P: 4,
                type: "number",
            },
            operationType2: {
                // 0 = none
                // 1 = enable posterior ultrasound
                // 2 = disable posterior ultrasound
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
                //Note: abort mission disables ultrasound
                // Note: in manual disables ultrasound
                // Note: in the semi-automatic menu there is a parameter to set
        },
    },
    enableOrDisableDevice:{//NEED RENAME ArrowLed
        id: "00043",
        params: {
            enableArrowLeft: {     
                P: 1,                       
                type: "number",           
            },
            disableArrowLeft: {
                P: 2,
                type: "number",
            },
            enableArrowRight: {
                P: 3,
                type: "number",
            },
            disableArrowRight: {
                P: 4,
                type: "number",
            },
            enableCharger: {
                P: 5,
                type: "number",
            },
            disableCharger: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
            //For P1 and P3 +10000 = AutoOff after Val-10000 (cm)
        },
    },
    readProductCode:{//VERIFY
        id: "00044",
        params: {
            readSynncrhone: {    //TRUE FALSE MAYBE 
                P: 1,                       
                type: "number",           
            },
            timeoutWait: {
                P: 2,
                type: "number",
            },
            nrVarOutcome: {
                //No. VR containing outcome
                P: 3,
                type: "number",
            },
            nrLineIfError: {
                P: 4,
                type: "number",
            },
            nrLineCallRoutineIfError: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    setSpeed:{//NEED RENAME
        id: "00045",
        params: {
            speed: { //percent
                P: 1,                       
                type: "number",           
            },
            speedmilisecondperseconds: {//    mm/s
                P: 2,
                type: "number",
            },
            setSpeedFromVar: {
                P: 3,
                type: "number",
                regex: /^(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|1[9][0-9]|19[0-2])$/,//1-192     
            },
            setSpeedFromVarUser: {
                P: 4,
                type: "number",
                regex: /^(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|1[9][0-9]|19[0-2])$/,//1-192  
            },
            nrLineCallRoutineIfError: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
            //The first valid parameter is considered
        },
    },
    waitMission:{//NEED RENAME
        id: "00050",
        params: {
            mode: { 
                // 0=Wait only for time indicated in P2
                // 1=Start from operator
                // 2=Local call
                // 3=Call from Master
                // 4=Call from master and copy program
                P: 1,                       
                type: "number",           
                regex: /^(0|[1-4])$/,//0-4
            },
            waitTime: {//seconds
                P: 2,
                type: "number",
            },
            nrLineJump: {
                // 0 = next line
                P: 3,
                type: "number",
            },
            typeJump: {
                // 0 = Jump
                // 1 = Call
                P: 4,
                type: "number",
                regex: /^(0|1)$/,     
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    viewString:{
        id: "00051",
        params: {
            caracter1: {
                P: 1,                       
                type: "number",           
            },
            caracter2: {
                P: 2,
                type: "number",
            },
            caracter3: {
                P: 3,
                type: "number",
            },
            caracter4: {
                P: 4,
                type: "number",
            },
            caracter5: {
                P: 5,
                type: "number",
            },
            caracter6: {
                P: 6,
                type: "number",
            },
            caracter7: {
                P: 7,
                type: "number",
            },
        },
    },
    waitForOperatorResponse:{//NEED RENAME
        id: "00052",
        params: {
            ifOkJump: {
                //Jump to line if Ok response 
                P: 1,                       
                type: "number",           
            },
            ifCancelJump: {
                //Jump to line if Cancel response 
                P: 2,
                type: "number",
            },
            varMemorForOkResponse: {
                P: 3,
                type: "number",
            },
            valueMemorOnVarP3: {
                P: 4,
                type: "number",
            },
            varForMemorP6CancelResponse: {
                P: 5,
                type: "number",
            },
            varMemorOnVrP5: {
                P: 6,
                type: "number",
            },
            startButtonAction: {
                //  0 = None
                //  1 = Unlock by moving to the next line
                //  2 = Unlock by simulating true condition
                //  >9 Wait time-out then move to the next line
                P: 7,
                type: "number",
            },
        },
    },

    doorCommand:{
        id: "00053",
        params: {
            caracter1: {
                P: 1,                       
                type: "number",           
            },
            caracter2: {
                P: 2,
                type: "number",
            },
            caracter3: {
                P: 3,
                type: "number",
            },
            caracter4: {
                P: 4,
                type: "number",
            },
            caracter5: {
                P: 5,
                type: "number",
            },
            caracter6: {
                P: 6,
                type: "number",
            },
            caracter7: {
                P: 7,
                type: "number",
            },
        },
        //The door address is managed by the Logo!
    },
    
    hookCart:{//NEED RENAME
        id: "00054",
        params: {
            hookMovement: {
                // 0 = No Movement
                // 1 = Raise Hook to sensor (3 sensors)
                // 2 = Lower Hook (everything drops)
                P: 1,                       
                type: "number",      
                regex: /^(0|1|2)$/       
            },
            P2: {
                // 0 = No Rotation
                // 1 = Clockwise rotation (positive speed)
                // 2 = Counterclockwise rotation (negative speed)
                // 3 = alternate rotation
                P: 2,
                type: "number",
                regex: /^(0|1|2|3)$/  
            },
            pinSpeed: {
                // -100 counterclockwise or +100 clockwise
                P: 3,
                type: "number",
            },
            timeRotationPinSecond: {
                P: 4,
                type: "number",
            },
            timeRotaionPinMiliseconds: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    
    setRearWheels:{
        id: "00055",
        params: {
            positionDegrees: {
                P: 1,                       
                type: "number",           
                regex: /^(0|[1-9][0-9]?|[1-7][0-9]{2})$/
            },
            free2: {
                P: 2,
                type: "number",
            },
            free3: {
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
        //The positions are zero 90 and 180 only
        //to consider that 90 is the straight wheel.
    },

    controLoadOnBoard:{
        id: "00056",
        params: {
            free1: {
                P: 1,                       
                type: "number",           
            },
            free2: {
                P: 2,
                type: "number",
            },
            free3: {
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },

    enableDisableFrontLaser:{//RENAME
        id: "00057",
        params: {
            EnableorDisable: {
                // 1 = Disable front laser 
                // 0 = Enable front laser
                P: 1,                       
                type: "number",      
                regex: /^(0|1)$/,

            },
            free2: {
                // 0
                P: 2,
                type: "number",
            },
            readingTreshold1: {
                P: 3,
                type: "number",
                regex: /^\d{4,}$/
            },
            readingTreshold2: {
                P: 4,
                type: "number",
                regex: /^\d{4,}$/
            },
            readingTreshold3: {
                P: 5,
                type: "number",
                regex: /^\d{4,}$/
            },
            readingTreshold4: {
                P: 6,
                type: "number",
                regex: /^\d{4,}$/
            },
            percentReductionSpeed: {
                P: 7,
                type: "number",
                regex: /^(0|[1-9][0-9]?|[1-9][0-9]{2})$/
            },
        },
    },
    
    forkCommand:{//RENAME MAYBE
        id: "00058",
        params: {
            P1: {
                // 1 = Ev command in bits 
                // 2 = command with quota
                P: 1,                       
                type: "number",     
                regex:/^(1|2)$/,      
            },
            quoteMm: {
                P: 2,
                type: "number",
            },
            UporDown: {
                //1 = up with bits 
                //0 = down with bits
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },

    tractionControl:{
        id: "00059",
        params: {
            maximumCurrentAllowedAmper: {
                P: 1,                       
                type: "number",           
            },
            allarmActivationDelay: {
                P: 2,
                type: "number",
            },
            free3: {
                P: 3,
                type: "number",
            },
            free4: {
                P: 4,
                type: "number",
            },
            free5: {
                P: 5,
                type: "number",
            },
            free6: {
                P: 6,
                type: "number",
            },
            free7: {
                P: 7,
                type: "number",
            },
        },
    },
    SetCartesianParameterMovement:{//RENAME MAYBE
        id: "00060",
        params: {
            CoordonateX: {//cm
                P: 1,                       
                type: "number",           
            },
            CoordonateY: {//cm
                P: 2,
                type: "number",
            },
            OrientationO: {
                P: 3,
                type: "number",
            },
            vrForX: {//if 0 use P1
                P: 4,
                type: "number",
            },
            vrForY: {//if 0 use P2
                P: 5,
                type: "number",
            },
            vrForO: {//if 0 use P3
                P: 6,
                type: "number",
            },
            VrIndexPunctTabel: {
                //If 0 use P4, P5, P6
                //If 1000 the data are offsets (rel. movement)
                P: 7,
                type: "number",
            },
        },
    },
};

export default { funcToId };
