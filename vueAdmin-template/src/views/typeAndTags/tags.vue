<template>
	<div class="app-container">
			
			<el-progress type="circle" :percentage="0"></el-progress>
			<el-progress type="circle" :percentage="25"></el-progress>
			<el-progress type="circle" :percentage="100" status="success"></el-progress>
			<el-progress type="circle" :percentage="50" status="exception"></el-progress>
	</div>
	
</template>