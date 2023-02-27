const styles = `
    input[rel="pb"]{
        border:1px solid rgba(0,0,0,0.2);
        padding:8px 12px;
        outline:none;
        transition:0.3s ease;
        border-radius:4px;
        box-sizing:border-box;
        &:focus{
            border-color:#40a9ff;
            box-shadow: 0 0 0 2px #40a9ff40;
        }
    }
    [rel="pb"]{
        &::-webkit-scrollbar {
            width: 3px;
            border-radius:4px;
        }
        &::-webkit-scrollbar-track {
        }
           
        &::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.6);
            border-radius:4px;
            &:hover{
                background-color: rgba(0,0,0,1);
            }
        }
    }
    @supports(-webkit-appearance: none) or (-moz-appearance: none) {
        input[type='checkbox'],
        input[type='radio'] {
          --active: rgb(56,152,236);
          --active-inner: #fff;
          --focus: 2px rgba(39, 94, 254, .3);
          --border: #BBC1E1;
          --border-hover: rgb(56,152,236);
          --background: #fff;
          --disabled: #F6F8FF;
          --disabled-inner: #E1E6F9;
          -webkit-appearance: none;
          -moz-appearance: none;
          height: 21px;
          outline: none;
          display: inline-block;
          vertical-align: top;
          position: relative;
          margin: 0;
          cursor: pointer;
          border: 1px solid var(--bc, var(--border));
          background: var(--b, var(--background));
          transition: background .3s, border-color .3s, box-shadow .2s;
          &:after {
            content: '';
            display: block;
            left: 0;
            top: 0;
            position: absolute;
            transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
          }
          &:checked {
            --b: var(--active);
            --bc: var(--active);
            --d-o: .3s;
            --d-t: .6s;
            --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
          }
          &:disabled {
            --b: var(--disabled);
            cursor: not-allowed;
            opacity: .9;
            &:checked {
              --b: var(--disabled-inner);
              --bc: var(--border);
            }
            & + label {
              cursor: not-allowed;
            }
          }
          &:hover {
            &:not(:checked) {
              &:not(:disabled) {
                --bc: var(--border-hover);
              }
            }
          }
          &:focus {
            box-shadow: 0 0 0 var(--focus);
          }
          &:not(.pb_switch) {
            width: 21px;
            &:after {
              opacity: var(--o, 0);
            }
            &:checked {
              --o: 1;
            }
          }
          & + label {
            font-size: 14px;
            line-height: 21px;
            display: inline-block;
            vertical-align: top;
            cursor: pointer;
            margin-left: 4px;
          }
        }
        input[type='checkbox'] {
          &:not(.pb_switch) {
            border-radius: 7px;
            &:after {
              width: 5px;
              height: 9px;
              border: 2px solid var(--active-inner);
              border-top: 0;
              border-left: 0;
              left: 7px;
              top: 4px;
              transform: rotate(var(--r, 20deg));
            }
            &:checked {
              --r: 43deg;
            }
          }
          &.pb_switch {
            width: 38px;
            border-radius: 11px;
            &:after {
              left: 2px;
              top: 2px;
              border-radius: 50%;
              width: 15px;
              height: 15px;
              background: var(--ab, var(--border));
              transform: translateX(var(--x, 0));
            }
            &:checked {
              --ab: var(--active-inner);
              --x: 17px;
            }
            &:disabled {
              &:not(:checked) {
                &:after {
                  opacity: .6;
                }
              }
            }
          }
        }
        input[type='radio'] {
          border-radius: 50%;
          &:after {
            width: 19px;
            height: 19px;
            border-radius: 50%;
            background: var(--active-inner);
            opacity: 0;
            transform: scale(var(--s, .7));
          }
          &:checked {
            --s: .5;
          }
        }
      }
  
      @-webkit-keyframes slide-in-bck-center {
        0% {
          -webkit-transform: translateZ(600px);
                  transform: translateZ(600px);
          opacity: 0;
        }
        100% {
          -webkit-transform: translateZ(0);
                  transform: translateZ(0);
          opacity: 1;
        }
      }
      @keyframes slide-in-bck-center {
        0% {
          -webkit-transform: translateZ(600px);
                  transform: translateZ(600px);
          opacity: 0;
        }
        100% {
          -webkit-transform: translateZ(0);
                  transform: translateZ(0);
          opacity: 1;
        }
      }
      
`
export default styles