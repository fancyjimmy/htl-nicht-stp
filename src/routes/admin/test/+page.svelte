<script>
    import Table from '$lib/components/Table.svelte';
    import EditTable from '$lib/components/utility/EditTable.svelte';

    export let data;
    $: tests = data.tests?.map((element) => {
        const {
            teacherId,
            subjectId,
            created_at,
            creatorId,
            test_type,
            subject: {name: subjectName},
            teacher: {name: teacherName},
            profile,
            ...rest
        } = element;

        const newElement = {
            ...rest,
            created: new Date(created_at).toLocaleString(),
            subject: subjectName,
            teacher: teacherName,
            type: test_type,
            creator: profile?.fullname,
            profile: creatorId
        };

        return newElement;
    });
</script>

<div class="w-full h-full p-6">
    <EditTable
            values={[...tests]}
            linkColumn={[{ columnName: 'profile', link: '/admin/user/{profile}', substitute: '↗️' }]}
    />
</div>
