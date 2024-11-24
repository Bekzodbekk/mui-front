import React from 'react'
import "./dashboard.scss"
import ActionAreaCard from './CardItem/Card'

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <div className="dashboard_cont">
          <ActionAreaCard title={"To'liq savdo"} price_or_count={"720.000"} additional={"so'm"}/>
          <ActionAreaCard title={"Tan narxi"} price_or_count={"420.000"} additional={"so'm"}/>
          <ActionAreaCard title={"Sof foyda"} price_or_count={"300.000"} additional={"so'm"}/>
          <ActionAreaCard title={"Sotilgan soni"} price_or_count={"15"} additional={"ta"}/>
        </div>
    </div>
  )
}

export default Dashboard