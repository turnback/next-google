import Head from "next/head";
import { useState } from "react";


export default function Home() {
  const [list, setlist] = useState([{ type: 'add', name:'添加快捷方式', src: "/images/add.png" }])
  const [show, setshow] = useState(false)

  const [name, setname] = useState('')
  const [url, seturl] = useState('')

  const [avatar, setavatar] = useState('')
  const add = (type) => {
    if(type==='add') {
      setshow(true)
    }
  }

  const cancelClick = ()=>{
    setshow(false)
    seturl('')
    setname('')
  }

  const delClick = () => {
    seturl('')
    setname('')
  }

  const confirmClick = () => {
    if(name.trim()==='') {
      window.alert('【名称】必填')
      return
    }
    if(url.trim()==='') {
      window.alert('【网址】必填')
      return
    }
    if (!(url.startsWith('http://') || url.startsWith('https://'))) {
      window.alert('请输入正确格式的网址')
      return
    }
    setlist([
      { url, name, src: `/images/pic${list.length%4+1}.png` },
      ...list
    ])
    setshow(false)
    setname('')
    seturl('')
  }

  const nameChange = (ev)=>{
    setname(ev.target.value)
  }
  const urlChange = (ev)=>{
    seturl(ev.target.value)
  }

  return (
    <>
      <Head>
        <title>google</title>
      </Head>
      <div className="box-wrapper">
          {
            list.map((_, index) => {
             return <a className="box" target="_blank" href={ _.type==='add'?'#':_.url } key={index} onClick={ ()=>add(_.type) }>
                <div className="img-wrapper">
                  <img src={ _.src } />
                </div>
                <div className="title">{ _.name }</div>
              </a>
            })
          }
      </div>

      {/* 弹窗 */}
      <div className="dialog" style={{ display: show?'flex':'none' }}>
        <div className="dialog-title">添加快捷方式</div>
        <span className="label">名称</span>
        <input value={ name } onChange={ nameChange } />
        <span className="label">网址</span>
        <input value={url} onChange={ urlChange} />
        <div className="footer">
          <div className="del" onClick={()=>delClick()}>删除</div>
          <div className="btns">
            <div className="cancel" onClick={()=>cancelClick()}>取消</div>
            <div className="confirm" onClick={()=>confirmClick()}>完成</div>
          </div>
        </div>
      </div>
      <style jsx>{`
      .del, .cancel, .confirm {
        font-size: 12px;
        color: #80868b;
        padding: 4px 13px;
        border: 1px solid;
        border-radius:4px;
        cursor:pointer;
      }
      .cancel {
        color:#1a73e8;
        border-color:#dadce0;
      }
      .del {
        border-color:#f1f3f4;
      }
      .confirm {
        background:#f1f3f4;
        border-color:#f1f3f4;
        margin-left:10px;
      }
      .dialog-title{
        font-size:13px;
        color:black;
      }
      .label {
        font-size:12px;
        display:block;
        margin:0;
        padding:0;
        margin-top:20px;
        border-radius:4px;
      }
      input {
        border:none;
        background:#f1f3f4;
        outline:none;
        box-shadow:none;
        height:30px;
      }
      .footer {
        display:flex;
        justify-content: space-between;
        margin-top:26px;
      }
      .btns {
        display:flex;
        font-size:12px;
      }
        .dialog {
          z-index:2000;
          width:310px;
          height:230px;
          border-radius:8px;
          background:white;
          position:fixed;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 15px;
          box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
        }
          .box-wrapper {
            display:flex;
            width:540px;
            flex-wrap:wrap;
            margin: 0 auto;
          }
          .box {
          width: 112px;
          height: 112px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background:white;
          border-radius: 4px;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          padding: 0 8px;
        }
        .box:hover {
          background: #e8e8e9;
        }
        .img-wrapper {
          width:48px;
          height:48px;
          background:#f1f3f4;
          display: flex;
          justify-content: center;
          align-items:center;
          border-radius:50%;
        }
        img {
          width:24px;
          height:24px;
          display:inline-flex;
        }
        .title {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size:13px;
          color:black;
          margin-top:8px;
        }
      `}</style>
    </>
  );
}
