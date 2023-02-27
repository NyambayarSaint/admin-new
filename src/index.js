import 'react-notifications/lib/notifications.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import Login from './pages/__Login'
import { AuthContextProvider } from './contexts/auth'
import { ThemeProvider } from 'styled-components'
import * as theme from './utils/theme'
import Register from 'pages/__Register'
import { NotificationContainer } from 'react-notifications';
import { ReferenceContextProvider } from 'contexts/reference'
import Forgot from 'pages/__Forgot';
import MainEntry from 'pages/MainEntry';
import Home from 'pages/Home';
import ModuleEntry from 'pages/Modules/entry';
import ModuleMain from 'pages/Modules';
import ModuleInstance from 'pages/Modules/Instance';
import AuthEntry from 'pages/AuthEntry';
import InstanceEntry from 'pages/Modules/Instance/entry';
import BuilderEntry from 'pages/Builder';
import 'assets/general.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<AuthContextProvider>
				<ReferenceContextProvider>
					<Routes>
						<Route path='/' element={<AuthEntry />}>
							<Route path='/' element={<MainEntry />}>
								<Route index element={<Home />} />
								<Route path=':module' element={<ModuleEntry />}>
									<Route index element={<ModuleMain />} />
									<Route path=':id' element={<InstanceEntry />}>
										<Route index element={<ModuleInstance />} />
									</Route>
								</Route>
							</Route>
							<Route path='/builder' element={<BuilderEntry />} />
						</Route>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/forgot' element={<Forgot />} />
					</Routes>
				</ReferenceContextProvider>
			</AuthContextProvider>
			<NotificationContainer />
		</ThemeProvider>
	</BrowserRouter>
)
