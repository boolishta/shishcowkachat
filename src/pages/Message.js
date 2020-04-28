import React from "react"
import style from "./Message.module.css"

export const Message = props => (
  <div className={style.message}>
    <span>{props.user === undefined ? <>no name</> : props.user}</span> :{" "}
    {props.content}
  </div>
)
