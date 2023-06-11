<script>
    import EditTable from '$lib/components/utility/EditTable.svelte';

    export let data;
    $: quotes = data.quotes.map((element) => {
        const {profile, teacherId, created_at, creatorId, teacher, ...rest} = element;

        return {
            ...rest,
            creatorName: profile?.fullname,
            teacherName: teacher.name,
            profile: profile?.id,
            teacher: teacherId,
            link: rest.id
        };
    });
</script>

<div class="w-full h-full p-6">
    <EditTable
            values={[...quotes]}
            linkColumn={[
			{ columnName: 'link', link: '/admin/quote/{link}', substitute: '↗️' },
			{ columnName: 'profile', link: '/admin/user/{profile}', substitute: '↗️' },
			{ columnName: 'teacher', link: '/teacher/{teacher}', substitute: '↗️' }
		]}
    />
</div>
